<!--这个是实现了多对话管理，流式消息展示，消息编辑与删除，里面含有三个借口，分别是创建消息，发起对话，然后再获取对话消息-->
<!--模版格式参考的claude.ai与chatgpt-->
<!--第一步：模版部分-->
<!--实现：有一个聊天列表区域，一个当前的聊天窗口-->
<template>
  <div id="app">
    <div class="chat-list">  <!--这里就是显示的是聊天的列表-->
      <h1>Clock</h1>
      <div 
        v-for="(conversation, index) in conversations" 
        :key="index" 
        class="chat-item"
        @click="selectConversation(index)"
      > 
       <!--这里的v-for就是用来循环渲染的，click就是点击进入所在对话-->
        <h3>chat {{ index + 1 }}</h3>  <!--往下加载，就是对话n-->
        <div class="messages"> 
          <div v-for="(message, msgIndex) in conversation.messages" :key="msgIndex" :class="message.type"><!--还是一个道理，循环消息数组，找到当前循环到的消息对象，与数组索引-->
            <p>{{ message.text }}</p> <!--用户输入的文字或 AI 的回复-->
            <div class="actions">
              <button @click="editMessage(index, msgIndex)">编辑</button>
              <button @click="deleteMessage(index, msgIndex)">删除</button>
            </div>
          </div>
        </div>
      </div>
      <button class="new-chat-btn" @click="newConversation">start a new chat</button>
    </div>
    
    <div class="current-chat">
      <div class="messages">
        <div v-for="(message, index) in currentConversation.messages" :key="index" :class="message.type">
          <p>{{ message.text }}</p>
        </div>
      </div>
      <div class="input-container">
        <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Reply to Clock ^_^ ..." />
        <button @click="sendMessage">send</button>
      </div>
    </div>
      <!-- 个人中心按钮 -->
      <router-link to="/profile" class="profile-btn">个人中心</router-link>
  </div>
 
</template>

<!--第二部分：脚本部分，这里就是重要的实现AI对话的逻辑，进而实现交互-->
<script>
export default {
  data() {
    return {
      userInput: '',
      conversations: [],
      currentConversationIndex: null,
      api_token: 'Bearer pat_gzkriBzO9kkigwPmWRCzKEVvCYVY4HUa216xAwsI3pCYYBmgEVfWvvOqJLR8SQzy', // API token
    };
  },
  computed: {
    currentConversation() {
      return this.conversations[this.currentConversationIndex] || {};
    } //这里表示的是计算属性，也就是获取当前选中的对话
  },
  methods: {
    // 新建对话窗口
    newConversation() {
      const newConversation = {
        conversationId: null,
        messages: [],
      };
      this.conversations.push(newConversation);
      this.currentConversationIndex = this.conversations.length - 1;
    },

    // 选择对话窗口
    selectConversation(index) {
      this.currentConversationIndex = index;
    },

    // 发送消息
    async sendMessage() {
      if (!this.userInput.trim()) return; // 输入为空不发送消息

      const conversation = this.currentConversation;

      // 判断是否有会话ID，如果没有则创建
      if (!conversation.conversationId) {
        const response = await fetch('https://api.coze.cn/v1/conversation/create', {
          method: 'POST',
          headers: {
            Authorization: this.api_token,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json(); //fetch 请求的响应中提取JSON 数据语句
        conversation.conversationId = data.data.id;  //更新这个对话id
      }

      // 发送用户消息
      const userMessage = { text: this.userInput, type: 'user' };
      conversation.messages.push(userMessage);
      this.userInput = ''; // 清空输入框

      // 发送消息给 AI
      let response = await fetch(`https://api.coze.cn/v3/chat?conversation_id=${conversation.conversationId}`, {
        method: 'POST',
        headers: {
          Authorization: this.api_token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bot_id: '7468872817791565863', // AI bot 的 ID
          user_id: '1',
          additional_messages: [{
            role: 'user',
            content_type: 'text',
            content: userMessage.text,
          }],
        }),
      });

      response = await response.json();
      const chatId = response.data.id;  

      // 每隔1秒检查 AI 是否回复,所以是GET
      const timer = setInterval(async () => {
        const chatResponse = await fetch(`https://api.coze.cn/v3/chat/retrieve?conversation_id=${conversation.conversationId}&chat_id=${chatId}`, {
          method: 'GET',
          headers: {
            Authorization: this.api_token,
            'Content-Type': 'application/json',
          },
        });

        const data = await chatResponse.json();  //同上
        if (data.data.status !== 'completed') {
          return; // 等待消息处理完成
        }

        clearInterval(timer); // 清除定时器

        // 获取 AI 回复消息，要信息了
        const messagesResponse = await fetch(`https://api.coze.cn/v3/chat/message/list?conversation_id=${conversation.conversationId}&chat_id=${chatId}`, {
          method: 'GET',
          headers: {
            Authorization: this.api_token,
            'Content-Type': 'application/json',
          },
        });
        //配置参考的API文档
        const messagesData = await messagesResponse.json();
        messagesData.data.forEach((msg) => {
          if (msg.type === 'answer') {  //如果恢回答了
            conversation.messages.push({ text: msg.content, type: 'ai' });  //将新的 AI 回复添加到 conversation.messages 数组中， AI 的回复内容 (msg.content) 作为文本消息添加
          }  //用来标识该消息是 AI 发送的，方便在前端显示时区分用户消息和 AI 消息
        });
      }, 1000);
    },

    // 编辑消息
    editMessage(conversationIndex, messageIndex) {
      const message = this.conversations[conversationIndex].messages[messageIndex];
      this.userInput = message.text; // 将消息内容填入输入框，允许编辑
      this.deleteMessage(conversationIndex, messageIndex); // 删除原始消息
    },

    // 删除消息
    deleteMessage(conversationIndex, messageIndex) {
      this.conversations[conversationIndex].messages.splice(messageIndex, 1);
    },
  },
};
</script>

<!--这里就是美化格式了，美化样式-->
<style scoped>
#app {
  font-family: 'cursive', cursive;  /**google字体 */
  display: flex;
  justify-content: space-between; 
  padding: 40px;  /**n内边距 */
  height: 100vh;
  background-color: #f4f4f4;
  justify-content: center; /* 在水平方向上居中对齐 */
  /* align-items: center; 在垂直方向上居中对齐 */
}

.chat-list {
  width: 400px;
  background-color: #C3BB9C;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 100%;
  overflow-y: auto; /**滚动条 */
  opacity: 80%;
  flex-shrink: 0;  /* 不让它缩小 */
}
.chat-list h1{
  font-size: 20;
  font-weight: bold;
  margin-bottom: auto;
}
.chat-item {
  margin-bottom: 15px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-height: 200px;
  overflow: auto;
}

.current-chat {
  flex-grow: 1;
  background-color: #F5F4E8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  
}

.messages {
  max-height: 100%;
  overflow-y: auto;
  margin-bottom: 10px;
  flex-grow: 1;
}

.messages .user {
  text-align: right;
  margin-bottom: 10px;
}

.messages .ai {
  text-align: left;
  margin-bottom: 10px;
  
}
.messages .user p, .messages .ai p {
  display: inline-block;
  max-width: 80%;  /* 限制消息气泡的最大宽度 */
  padding: 10px;
  border-radius: 15px;  /* 圆角效果 */
  word-wrap: break-word;  /* 自动换行 */
  font-size: 20px;  /* 设置更大的字体 */
}

.input-container {
  display: flex;
  justify-content: space-between;
  margin-top: auto; /* 确保输入框固定在底部 */
}
.messages .user p {
  background-color: #ACAA8D;  /* 用户消息气泡的背景色 */
  color: white;
}
.messages .ai p {
  background-color: #FFFFFF;  /* AI 消息气泡的背景色 */
  color: black;
}
.input-container input {
  width: 60%;
  height: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-left: 280px;
  font-size: 20px;
  font-family: cursive;
}

.input-container button {
  width: 15%;
  padding: 16px;
  margin-right: auto;
  background-color: #d48a6d;
  color: white;
  font-size: 20px;
  font-family: cursive;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.input-container button:hover {
  background-color: #D57F5D;
}

.actions {
  display: flex;  /**按钮横向排列 */
  gap: 5px;  /*设置按钮之间的间距 */
  font-size: 20px;/**按钮字体大小 */
  color: green;
  
}

button {
  /* background: none; */
  border: none;
  color: #040404;
  background-color: #F8F4D9;
  cursor: pointer;
  font-family: cursive;
  font-size: 20px;
}
.new-chat-btn{
  background-color: #F8F4D9;
  font-size: 25px;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}
button:hover {
  background-color: #D2C679;
}
.profile-btn {
  position: absolute;
  bottom: 1px;  /* 距离底部 20px */
  left: 50px;
  background-color: #D2C679;
  color: rgb(12, 12, 12);
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  width: 420px;
  font-size: 16px;
  text-decoration: none;  /* 去掉链接的下划线 */
}

.profile-btn:hover {
  background-color: #dac042;  /* 鼠标悬停时颜色变深 */
}
</style>