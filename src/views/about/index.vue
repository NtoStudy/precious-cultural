<template>
  <div class="about-page">
    <el-container>
      <el-main class="main-content">
        <section class="introduction">
          <h2>项目介绍</h2>
          <section class="introduction-section">
            <h3>探索文化，传承遗产</h3>
            <p>我们的项目是一个创新的旅游体验平台，旨在保护和传承非物质文化遗产（非遗），同时为游客提供独特的文化体验。通过结合现代旅游和传统文化，我们致力于展示中国丰富的文化遗产，促进当地经济发展，并提高公众对非遗重要性的认识。</p>
          </section>
          <section class="mission-section">
            <h3>我们的使命</h3>
            <ul>
              <li><strong>保护非遗：</strong>记录和数字化非遗项目，防止它们随时间消失。</li>
              <li><strong>教育公众：</strong>通过教育活动和体验，提高公众对非遗价值的认识。</li>
              <li><strong>支持社区：</strong>为非遗传承人和相关社区提供支持，帮助他们从旅游活动中获益。</li>
              <li><strong>促进旅游：</strong>开发以非遗为主题的旅游产品，吸引国内外游客。</li>
            </ul>
          </section>
        </section>
        <section class="team-introduction">
          <h2>团队介绍</h2>
          <p>我们的团队由文化专家、旅游规划师、技术开发人员和市场营销专家组成。我们对文化遗产充满热情，致力于通过创新的方式保护和传承非遗。</p>
        </section>
        <section class="project-history">
          <h2>项目历史</h2>
          <br/>
          <el-timeline>
          <el-timeline-item timestamp="2024-4-8">项目筹备启动</el-timeline-item>
          <el-timeline-item timestamp="2024-6">产品原型设计完成</el-timeline-item>
          <el-timeline-item timestamp="2024-8">首次产品测试</el-timeline-item>
          <el-timeline-item timestamp="2024-10">产品正式发布</el-timeline-item>
        </el-timeline>
        </section>
        <section class="contact-us">
          <h2>联系我们</h2>
          <p>电话：+86 123 456 7890</p>
          <p>邮箱：contact@yangcong.com</p>
          <p>地址：中国上海市浦东新区某某路123号</p>
        </section>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ElContainer, ElHeader, ElMain, ElTimeline, ElTimelineItem } from 'element-plus';
</script>

<style lang="scss" scoped>
.about-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 40px;
}

  .main-content {
    flex: 1;
    padding: 20px;
    background: url("~@/assets/img_1.png") no-repeat center center / cover;
    .introduction h3{
      margin-top: 20px;
       font-size: 20px;
      font-weight: 500;
    }
    .mission-section li{
      margin-top: 10px;
    }
    h2 {
      margin-top: 20px;
      font-size: 24px;
    }

    p {
      line-height: 1.6;
      margin-top: 10px;
    }
  }

</style>
