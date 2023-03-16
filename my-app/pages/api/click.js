export default function click(req, res) {
    if (req.method === 'POST') {
      const { yandex, google } = req.body;
      // Обработка POST запроса здесь
      // ...
      res.status(200).json({ data: 'Success' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  }