#!/usr/bin/env python3
"""
Potter Labs Video Orchestration CLI
Interactive terminal interface for building video generation workflows
"""

import click
import asyncio
import httpx
import json
import os
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.prompt import Prompt, Confirm
from rich.progress import Progress, SpinnerColumn, TextColumn
from typing import Dict, Any, Optional, List

from schemas import VideoRequest, VideoStyle
from routing import ProviderRouter
from providers import ProviderHealthChecker

console = Console()

# Configuration
AI_LOGIC_URL = os.getenv("AI_LOGIC_URL", "http://localhost:8000")
NODE_API_URL = os.getenv("NODE_API_URL", "http://localhost:3000")


@click.group()
@click.version_option()
def cli():
    """Potter Labs AI Video Generation CLI
    
    Interactive orchestration tools for AI video generation with intelligent provider routing.
    """
    pass


@cli.command()
@click.option('--interactive', '-i', is_flag=True, help='Interactive mode with prompts')
@click.option('--topic', '-t', help='Video topic')
@click.option('--style', '-s', type=click.Choice([s.value for s in VideoStyle]), help='Video style')
@click.option('--duration', '-d', type=int, help='Video duration in seconds')
@click.option('--provider', '-p', help='Preferred provider (optional)')
@click.option('--output', '-o', help='Output file for configuration')
def orchestrate(interactive, topic, style, duration, provider, output):
    """Orchestrate a video generation request"""
    
    if interactive:
        config = interactive_video_builder()
    else:
        if not topic or not style:
            console.print("[red]Topic and style are required in non-interactive mode[/red]")
            raise click.Abort()
        
        config = {
            'topic': topic,
            'style': style,
            'duration': duration,
            'preferred_provider': provider
        }
    
    asyncio.run(process_orchestration(config, output))


@cli.command()
def providers():
    """Show provider status and capabilities"""
    asyncio.run(show_provider_status())


@cli.command()
@click.argument('config_file')
def analyze(config_file):
    """Analyze a configuration file without executing"""
    try:
        with open(config_file, 'r') as f:
            config = json.load(f)
        
        asyncio.run(analyze_configuration(config))
        
    except FileNotFoundError:
        console.print(f"[red]Configuration file {config_file} not found[/red]")
    except json.JSONDecodeError:
        console.print(f"[red]Invalid JSON in {config_file}[/red]")


@cli.command()
@click.argument('config_files', nargs=-1, required=True)
@click.option('--batch-size', '-b', default=5, help='Batch size for concurrent processing')
def batch(config_files, batch_size):
    """Process multiple video configurations in batch"""
    asyncio.run(process_batch(config_files, batch_size))


@cli.command()
def health():
    """Check health of all services"""
    asyncio.run(health_check())


def interactive_video_builder() -> Dict[str, Any]:
    """Interactive video configuration builder"""
    
    console.print(Panel.fit(
        "[bold blue]Potter Labs Video Orchestration[/bold blue]\n"
        "Let's build your video generation request step by step.",
        title="Welcome"
    ))
    
    config = {}
    
    # Basic configuration
    config['topic'] = Prompt.ask("[bold]What's your video topic?[/bold]")
    
    # Style selection with descriptions
    style_options = {
        'cinematic': 'Professional, movie-like quality with camera movements',
        'photorealistic': 'Highly realistic, photo-quality visuals',
        'animation': 'Animated, cartoon-style visuals',
        'artistic': 'Creative, artistic interpretation',
        'abstract': 'Abstract, experimental visuals',
        'documentary': 'Documentary-style, factual presentation',
        'slideshow_modern': 'Modern slideshow with images and transitions',
        'slideshow_classic': 'Traditional slideshow presentation'
    }
    
    console.print("\n[bold]Available styles:[/bold]")
    for style, description in style_options.items():
        console.print(f"  [cyan]{style:<20}[/cyan] {description}")
    
    config['style'] = Prompt.ask(
        "\n[bold]Choose a style[/bold]",
        choices=list(style_options.keys())
    )
    
    # Duration
    config['duration'] = click.prompt(
        'Video duration in seconds',
        type=int,
        default=30
    )
    
    # Optional parameters
    if Confirm.ask("Would you like to specify additional options?"):
        config['prompt'] = Prompt.ask(
            "[bold]Custom prompt (optional)[/bold]",
            default=""
        )
        
        config['theme'] = Prompt.ask(
            "[bold]Theme/content type[/bold] (educational, entertainment, corporate, creative)",
            default=""
        )
        
        config['aspect_ratio'] = Prompt.ask(
            "[bold]Aspect ratio[/bold]",
            default="16:9",
            choices=["16:9", "9:16", "1:1"]
        )
        
        config['voice_style'] = Prompt.ask(
            "[bold]Voice style (optional)[/bold]",
            default=""
        )
        
        config['background_music'] = Prompt.ask(
            "[bold]Background music (optional)[/bold]",
            default=""
        )
    
    # Provider preference
    if Confirm.ask("Do you have a preferred provider?"):
        config['preferred_provider'] = Prompt.ask(
            "[bold]Preferred provider[/bold]",
            choices=['runway', 'pika', 'gemini_veo', 'slideshow']
        )
    
    # Priority
    config['priority'] = Prompt.ask(
        "[bold]Priority level[/bold]",
        choices=['low', 'standard', 'high'],
        default='standard'
    )
    
    return config


async def process_orchestration(config: Dict[str, Any], output_file: Optional[str] = None):
    """Process video orchestration request"""
    
    try:
        # Create request object
        request = VideoRequest(**config)
        
        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            console=console
        ) as progress:
            
            # Analyze request
            task1 = progress.add_task("Analyzing request...", total=None)
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{AI_LOGIC_URL}/analyze/request",
                    json=request.dict(),
                    timeout=30.0
                )
                
                if response.status_code != 200:
                    console.print(f"[red]Analysis failed: {response.text}[/red]")
                    return
                
                analysis = response.json()
            
            progress.update(task1, completed=True)
            
            # Show analysis
            display_routing_analysis(analysis)
            
            # Confirm execution
            if not Confirm.ask("\nProceed with video generation?"):
                console.print("Operation cancelled.")
                return
            
            # Execute orchestration
            task2 = progress.add_task("Starting video generation...", total=None)
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{AI_LOGIC_URL}/orchestrate/video",
                    json=request.dict(),
                    timeout=30.0
                )
                
                if response.status_code != 200:
                    console.print(f"[red]Orchestration failed: {response.text}[/red]")
                    return
                
                result = response.json()
            
            progress.update(task2, completed=True)
        
        # Display result
        display_orchestration_result(result)
        
        # Save configuration if requested
        if output_file:
            with open(output_file, 'w') as f:
                json.dump(result, f, indent=2)
            console.print(f"\n[green]Configuration saved to {output_file}[/green]")
    
    except Exception as e:
        console.print(f"[red]Error: {str(e)}[/red]")


async def show_provider_status():
    """Display provider status and capabilities"""
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{AI_LOGIC_URL}/providers/status", timeout=10.0)
            
            if response.status_code != 200:
                console.print(f"[red]Failed to get provider status: {response.text}[/red]")
                return
            
            providers = response.json()
        
        # Create status table
        table = Table(title="Provider Status & Capabilities")
        table.add_column("Provider", style="bold")
        table.add_column("Status", style="bold")
        table.add_column("Response Time", justify="center")
        table.add_column("Capabilities")
        table.add_column("Quality")
        
        for provider_name, status in providers.items():
            status_icon = "🟢" if status['is_healthy'] else "🔴"
            status_text = "Healthy" if status['is_healthy'] else "Unavailable"
            
            response_time = f"{status.get('response_time_ms', 0):.0f}ms" if status['is_healthy'] else "N/A"
            
            capabilities = status.get('capabilities', {})
            cap_text = ", ".join(capabilities.get('features', [])) if capabilities else "N/A"
            quality = capabilities.get('quality', 'N/A') if capabilities else 'N/A'
            
            table.add_row(
                provider_name,
                f"{status_icon} {status_text}",
                response_time,
                cap_text,
                quality
            )
        
        console.print(table)
        
    except Exception as e:
        console.print(f"[red]Error checking provider status: {str(e)}[/red]")


async def analyze_configuration(config: Dict[str, Any]):
    """Analyze configuration without executing"""
    
    try:
        request = VideoRequest(**config)
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{AI_LOGIC_URL}/analyze/request",
                json=request.dict(),
                timeout=30.0
            )
            
            if response.status_code != 200:
                console.print(f"[red]Analysis failed: {response.text}[/red]")
                return
            
            analysis = response.json()
        
        display_routing_analysis(analysis)
        
    except Exception as e:
        console.print(f"[red]Error analyzing configuration: {str(e)}[/red]")


async def process_batch(config_files: List[str], batch_size: int):
    """Process multiple configurations in batch"""
    
    console.print(f"[bold]Processing {len(config_files)} configurations in batches of {batch_size}[/bold]\n")
    
    # Load configurations
    requests = []
    for i, config_file in enumerate(config_files):
        try:
            with open(config_file, 'r') as f:
                config = json.load(f)
            config['request_id'] = f"batch_{i}"
            requests.append(VideoRequest(**config))
        except Exception as e:
            console.print(f"[red]Error loading {config_file}: {str(e)}[/red]")
    
    if not requests:
        console.print("[red]No valid configurations to process[/red]")
        return
    
    try:
        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            console=console
        ) as progress:
            
            task = progress.add_task("Processing batch...", total=None)
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{AI_LOGIC_URL}/batch/orchestrate",
                    json=[req.dict() for req in requests],
                    timeout=60.0
                )
                
                if response.status_code != 200:
                    console.print(f"[red]Batch processing failed: {response.text}[/red]")
                    return
                
                results = response.json()
            
            progress.update(task, completed=True)
        
        # Display results
        display_batch_results(results)
        
    except Exception as e:
        console.print(f"[red]Error processing batch: {str(e)}[/red]")


async def health_check():
    """Check health of all services"""
    
    services = [
        ("AI Logic Service", AI_LOGIC_URL, "/health"),
        ("Node API", NODE_API_URL, "/health")
    ]
    
    table = Table(title="Service Health Check")
    table.add_column("Service", style="bold")
    table.add_column("URL")
    table.add_column("Status", style="bold")
    table.add_column("Response Time")
    
    for service_name, base_url, endpoint in services:
        try:
            start_time = asyncio.get_event_loop().time()
            
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{base_url}{endpoint}", timeout=5.0)
                
                end_time = asyncio.get_event_loop().time()
                response_time = f"{(end_time - start_time) * 1000:.0f}ms"
                
                if response.status_code == 200:
                    status = "🟢 Healthy"
                else:
                    status = f"🟡 {response.status_code}"
                    
        except Exception as e:
            status = "🔴 Unavailable"
            response_time = "N/A"
        
        table.add_row(service_name, base_url, status, response_time)
    
    console.print(table)


def display_routing_analysis(analysis: Dict[str, Any]):
    """Display routing analysis in a formatted way"""
    
    routing = analysis.get('routing_decision', {})
    
    console.print(Panel.fit(
        f"[bold green]Provider:[/bold green] {routing.get('provider', 'N/A')}\n"
        f"[bold blue]Mode:[/bold blue] {routing.get('mode', 'N/A')}\n"
        f"[bold yellow]Confidence:[/bold yellow] {routing.get('confidence', 0):.2f}\n"
        f"[bold cyan]Reason:[/bold cyan] {routing.get('reason', 'N/A')}",
        title="Routing Decision"
    ))
    
    capabilities = analysis.get('provider_capabilities', {})
    if capabilities:
        console.print("\n[bold]Provider Capabilities:[/bold]")
        for provider, caps in capabilities.items():
            console.print(f"  [cyan]{provider}:[/cyan] {caps.get('quality', 'N/A')} quality, "
                        f"{caps.get('max_duration', 'N/A')}s max duration")


def display_orchestration_result(result: Dict[str, Any]):
    """Display orchestration result"""
    
    console.print(Panel.fit(
        f"[bold green]Job ID:[/bold green] {result.get('job_id', 'N/A')}\n"
        f"[bold blue]Provider:[/bold blue] {result.get('provider', 'N/A')}\n"
        f"[bold yellow]Mode:[/bold yellow] {result.get('mode', 'N/A')}\n"
        f"[bold cyan]Estimated Duration:[/bold cyan] {result.get('estimated_duration', 'N/A')}\n"
        f"[bold magenta]Reason:[/bold magenta] {result.get('routing_reason', 'N/A')}",
        title="Video Generation Started"
    ))
    
    console.print(f"\n[green]✅ Video generation job started successfully![/green]")
    console.print(f"[dim]Track progress at: /video/url?id={result.get('job_id', '')}[/dim]")


def display_batch_results(results: Dict[str, Any]):
    """Display batch processing results"""
    
    batch_results = results.get('batch_results', [])
    
    success_count = len([r for r in batch_results if r['status'] == 'success'])
    error_count = len([r for r in batch_results if r['status'] == 'error'])
    
    console.print(f"\n[bold]Batch Processing Complete[/bold]")
    console.print(f"[green]✅ Successful: {success_count}[/green]")
    console.print(f"[red]❌ Failed: {error_count}[/red]")
    
    if error_count > 0:
        console.print("\n[bold red]Errors:[/bold red]")
        for result in batch_results:
            if result['status'] == 'error':
                console.print(f"  [red]{result['request_id']}: {result['error']}[/red]")


if __name__ == '__main__':
    cli()