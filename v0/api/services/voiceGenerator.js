export async function synthesizeVoice(_script, voice) {
  return `${voice || 'default'}_voice.mp3`;
}
