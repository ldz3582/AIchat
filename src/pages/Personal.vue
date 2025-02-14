<template>
    <div class="container">
      <!-- 外部容器，使 User Center 和 User Dashboard 在一个容器内 -->
      <div class="user-wrapper">
        <!-- User Center Section -->
        <div class="user-center">
          <h1>User Center</h1>
          <div class="form-container">
            <label for="full-name">Full name</label>
            <input type="text" id="full-name" placeholder="Enter your full name" />
  
            <label for="nickname">What should we call you</label>
            <input type="text" id="nickname" placeholder="Enter your nickname" />
  
            <label for="work">What best describes your work?</label>
            <input type="text" id="work" placeholder="Describe your work" />
  
            <button class="submit-btn">Submit</button>
          </div>
        </div>
  
        <!-- User Dashboard Section -->
        <div class="user-dashboard">
          <h2>User Dashboard</h2>
          <div class="dashboard-items">
            <div class="dashboard-item">Edit Account</div>
            <div class="dashboard-item">Change Account</div>
            <div class="dashboard-item">Change Password</div>
            <div class="dashboard-item">Update Account Information</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: 'Profile',
  };
  </script>
  
  <style scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #F5F4E8;
}

.user-wrapper{
    background-color: #D0C89A;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    max-width: 2000px;
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.user-center{
    padding: 20px;
    border-radius: 10px;
}
.user-center h1{
    font-family: cursive;
    font-size: 40px;
    margin-bottom: 15px;
}
.form-container{
    display: flex;
    margin: 10px 0 5px;
    flex-direction: column;
    align-items: flex-end; /* 让按钮对齐到右侧 */
}
label{
    font-size: 26px;
    margin: 10px 0 5px;
    text-align: left;
    width: 100%;
    font-family: cursive;
}
input{
    padding: 10px;
    width: 100%;
    font-family: cursive;
    font-size: 24px;
    border-radius: 10px;
    border: 1px solid #ccc;
}
.submit-btn{
    background-color: #D57F5D;
    color: black;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    font-family: cursive;
    font-size: 24px;
    cursor: pointer;
    width: 10%;
    align-self: flex-end;
    bottom: 10px;
    margin-top: 30px;
    
}
.submit-btn:hover{
    background-color: #BC4C20;
}
.user-dashboard{
    background-color: #D0C89A;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    font-family: cursive;
}
.dashboard-items{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.dashboard-item{
    background-color: #E0D8BD;
    padding: 40px;
    border-radius: 10px;
    font-size: 30px;
    height: 20px;
    font-family: cursive;
    text-align: center;
}
</style>