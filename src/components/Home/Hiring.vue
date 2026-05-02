<template>
  <section>
    <div class="apply-section bg-white border shadow-lg rounded-lg px-6 flex justify-between items-center max-w-6xl mx-4 lg:mx-auto">
        <!-- Left Side - Text and Button -->
        <div class="flex items-center space-x-4">
          <img src="/images/bg-left-hiring.svg" alt="Illustration" class="hidden md:block object-cover" />
          <div>
            <h1 class="font-bold text-gray-500">
              WE ARE <br><span class="text-3xl lg:text-5xl font-extrabold text-gray-900">HIRING</span>
            </h1>
            <p class="text-gray-600">Let's Work Together & Explore Opportunities</p>
          </div>
        </div>
    
        <!-- Right Side - Apply Button -->
        <div class="flex items-center space-x-6">
          <RouterLink to="/jobs" class="bg-main hover-up text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition">
            <i class="fas fa-check-circle mr-2"></i> Apply Now
          </RouterLink>
  
          <img src="/images/bg-right-hiring.svg" alt="Illustration" class="hidden md:block object-cover" />
        </div>
    </div>
  </section>
  </template>
  
  <script>
  export default {
    setup() {
      return {};
    },
  };
  </script>
  
  <style scoped>
  /* Optional styling for mobile responsiveness */
  @media (max-width: 768px) {
    .apply-section {
      flex-direction: column;
      padding: 20px 10px;
      text-align: center;
    }
    .apply-section button {
        margin-top: 10px;
    }
  }

  .apply-section {
    margin-top: 100px;
    margin-bottom: 100px;
  }
  </style>
  