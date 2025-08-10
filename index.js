// Replit Aracı Sunucusu - index.js

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Gizli bilgileri "Secrets" bölümünden güvenli bir şekilde al
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

app.get("/", (req, res) => {
  res.send("Telegram Aracı Sunucusu Aktif! 🤖");
});

app.post("/gonder", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, error: "Mesaj içeriği boş olamaz." });
  }

  console.log(`Yeni mesaj alındı: "${message}". Telegram'a gönderiliyor...`);

  try {
    const telegramResponse = await axios.post(TELEGRAM_API_URL, {
      chat_id: CHAT_ID,
      text: message,
    });

    console.log("Telegram'a başarıyla gönderildi.");
    res.status(200).json({ success: true, data: telegramResponse.data });

  } catch (error) {
    console.error("Telegram'a gönderirken hata oluştu:", error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, error: "Telegram API hatası", details: error.response ? error.response.data : error.message });
  }
});

app.listen(3000, () => {
  console.log("Sunucu 3000 portunda dinleniyor");
});
