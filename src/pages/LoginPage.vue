<!--模版格式参考的claude.ai -->

<template>
    <div class="login-page">
      <div class="login-container">
        <!-- 左侧：登录表单 -->
        <div class="login-left">
         <h1>Clock</h1>
          <h2>Your ideas,</h2>
          <h2>amplified</h2>
          <p>privacy-first AI that helps you create in confidence</p>
  
          <form @submit.prevent="login">
            <input v-model="username" placeholder="Enter username" required />
            <input v-model="password" type="password" placeholder="Enter password" required />
            <button type="submit">Login</button>
          </form>  <!--双向绑定-->
          <p class="terms">
            By continuing, you agree to Anthropic's <a href="https://www.anthropic.com/legal/archive/7197103a-5e27-4ee4-93b1-f2d4c39ba1e7">Consumer Term s</a> and <a href="https://www.anthropic.com/legal/archive/90113ac5-6846-4777-84d8-edde3719ac06">Privacy Policy</a>.
          </p>
        </div>
  
        <!-- 右侧：图片 -->
        <div class="login-right">
          <!-- <img src="../assets/pic1.jpeg" alt="Login Illustration" /> -->
          <Carousel /> <!-- 使用轮播图组件 -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Carousel from "../components/Carousel.vue"; 
  export default {
    components: { Carousel },
    data() {      
      return {
        username: '',
        password: '',
        isLoggedIn: false // 控制是否显示 "Go to Chat" 链接
      };
    },
    methods: {
      login() {
        // 假设用户名是 "user" 且密码是 "password"，这只是一个简单示例
        if (this.username === 'user' && this.password === 'password') {
          console.log('Logged in with:', this.username, this.password);
          this.isLoggedIn = true; // 登录成功后设置 isLoggedIn 为 true
          this.$router.push('/chat'); // 登录成功后跳转到聊天页面
        } else {    
          alert('Invalid credentials'); // 登录失败时提示错误
        }
      }
    }
  };
  </script>
  
<style scoped>
.login-page{   /*定义整个容器也就是整个登陆页面 */
    display: flex;   /*使用flex布局 */
    justify-content: center;  /*水平居中对齐*/
    align-items: center;  /*控制交叉轴的元素对齐方式 */
    height: 100vh; /*内容填满屏幕 */
    background-color: #F5F4E8;
}
.login-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90vw; /* 增加宽度，让它更接近红框 */
  height: 85vh; /* 增加高度，减少上方和下方的留白 */
  max-width: 3000px; /* 最大宽度，确保不会过大 */
  /* max-height: 2000px; 最大高度，确保不会超出视口 */
  background-color: #F1ECD9;
  border-radius: 20px;
  /* box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2); /* 增强阴影，让其更加立体 */
  /*border-radius: 20px; 让圆角更自然，稍大一点 */
  overflow: hidden;
}
.login-left{
    display: flex;
    width: 50%;
    height: 100%;
    padding: 2rem;
    flex-direction: column;
    justify-content: center;
    background-color: #F5F4E8;
    box-shadow: 0 ;
    border-radius: 0;
    overflow: hidden;
    align-items: center; /* 让表单居中 */
    text-align: center; /* 让文本居中 */
}

form {
  display: flex;
  flex-direction: column; /* 让输入框换行 */
  align-items: center; /* 让输入框居中对齐 */
  width: 100%;
}
h1 {
  font-size: 2rem;
  margin-top: 2rem; /* 距离顶部 2rem */
  margin-bottom: 3rem; /* 设置底部的间距 */
  color: black;
  font-family: 'cursive', cursive; /* 设置字体 */
  /* position: absolute; 让标题绝对定位 */
  top: 0; /* 将标题固定在页面顶部 */
}
h2{
    font-size: 5rem;
    margin-top: 0;
    color: 000000;
    font-family: 'ExtraBold',cursive;
    margin-bottom: 0.1rem;
}
p{
    color: gray;
    margin-bottom: 4rem;
    font-size: 1.4rem;
    font-family: 'cursive',cursive;
}
input{
    margin: 1.5rem 0;
    padding: 1rem;
    border-radius: 8px;
    width: 50%;
    border: 1px solid grey;
    font-family: 'cursive',cursive;
    font-size: 1.4rem;
}
button{
    padding: 1rem;
    background-color: #D57F5D;
    color: black;
    width: 60%;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.3rem;
    font-family: 'cursive',cursive;
}
button:hover {
  background-color: #e5801e;
}
.terms{
    font-size: 0.9rem;
    color: #555;

}

.terms a{
    color: #f7931e;
    text-decoration: none;

}

.login-right{
    width:50%;
    height: 100%;
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #F1ECD9;
    box-shadow: 0;
    border-radius: 20px;
    overflow: hidden;
}
/* .login-right img{
    max-width: 100%;
    height: auto;
    border-radius: 12px;
} */

</style>