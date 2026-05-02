<script setup>
import Subscribe from '@/components/Home/Subscribe.vue';
</script>

<template>
  <section class="job-dashboard mt-16 py-10">
    <div
      class="w-full h-48 flex items-center bg-center"
      style="
        background-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.9),
            rgba(0, 0, 0, 0)
          ),
          url('/images/job-single.svg');
      "
    >
      <div
        class="inset-0 text-white max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between"
      >
        <div>
          <p class="text-xl lg:text-3xl font-bold">About Us</p>
          <p class="">Get the latest news, updates and tips</p>
        </div>
        <div
          class="text-xs rounded text-gray-400 bg-white py-2 px-3 mt-3 sm:mt-0 w-max"
        >
          <i class="fas fa-home mr-2"></i> <RouterLink to="/">Home</RouterLink>
          <i class="fas fa-chevron-right mx-3"></i> About Us
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-dark">
      <section class="py-16 text-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-2xl font-extrabold text-gray-900 sm:text-4xl">
              About Our Company
            </h2>
            <p class="mt-4 max-w-xl mx-auto text-gray-600">
              We are committed to connecting the best talents with top
              companies. Our mission is to provide a seamless job search
              experience for job seekers and a streamlined hiring process for
              employers.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="">
              <img
                src="/images/7.jpg"
                alt="About Us"
                class="rounded-lg shadow-lg"
              />
            </div>
            <div class="space-y-6">
              <div>
                <h3 class="text-2xl font-bold text-gray-900">Our Story</h3>
                <p class="mt-2 text-gray-600">
                  Founded in 2021, our job portal has grown to become a leading
                  platform in the job market. We started with a simple idea to
                  make job searching easy and efficient for everyone. Our team
                  of dedicated professionals works tirelessly to bring you the
                  best opportunities from top employers.
                </p>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900">Our Values</h3>
                <p class="mt-2 text-gray-600">
                  At our core, we value integrity, transparency, and customer
                  satisfaction. We believe in creating a positive impact on the
                  job market by providing high-quality services and maintaining
                  a trustworthy relationship with our users.
                </p>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900">Our Mission</h3>
                <p class="mt-2 text-gray-600">
                  Our mission is to bridge the gap between job seekers and
                  employers by providing an easy-to-use platform that offers a
                  wide range of job opportunities. We strive to help individuals
                  find their dream jobs and assist companies in finding the
                  right talent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>

  <Subscribe />
</template>

<style scoped>
.post-job-hero {
  height: 45vh;
}
</style>
