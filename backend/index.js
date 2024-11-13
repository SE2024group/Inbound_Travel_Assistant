const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const APPID = process.env.APPID;
const APPSECRET = process.env.APPSECRET;
const SECRET_KEY = process.env.SECRET_KEY;

app.post('/wechat-login', async (req, res) => {
    const { code } = req.body;
    if (!code) {
        console.log('缺少 code 参数');
        return res.status(400).json({ error: '缺少 code 参数' });
    }
    console.log('收到请求：', req.body);
  
    try {
      const response = await axios.get(`https://api.weixin.qq.com/sns/jscode2session`, {
        params: {
          appid: APPID,
          secret: APPSECRET,
          js_code: code,
          grant_type: 'authorization_code'
        }
      });

      console.log('微信服务器响应：', response.data);
  
      const { openid, session_key, errcode, errmsg } = response.data;
  
      if (errcode) {
        console.log('微信服务器返回错误：', errmsg);
        return res.status(400).json({ error: errmsg });
      }
  
      // 根据 openid 生成 JWT
      const token = jwt.sign({ openid }, SECRET_KEY, { expiresIn: '7d' });
  
      res.json({
        token,
        openid,
        session_key,
      });
    } catch (error) {
        console.error('微信登录失败：', error);
      res.status(500).json({ error: '服务器内部错误' });
    }
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`服务器正在运行在端口 ${PORT}`);
});
