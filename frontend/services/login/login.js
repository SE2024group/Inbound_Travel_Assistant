const axios = require('axios');

app.post('/wechat-login', async (req, res) => {
  const { code, userInfo } = req.body;
  const appId = 'wx7eb480f15bcc4f20';
  const appSecret = '50985ccdbfc623bd2c8d1cf9f9770a52';

  try {
    const response = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`);
    const { openid, session_key } = response.data;

    // 检查用户是否存在，若不存在则创建用户
    let user = await findOrCreateUser(openid, userInfo);

    // 生成JWT或会话Token
    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    res.status(500).send('微信登录失败');
  }
});
