export function authMiddleware(req, res, next) {
  const apiKey = req.header('X-API-KEY');
  const expected = process.env.API_KEY || 'testkey';
  if (!apiKey || apiKey !== expected) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}
