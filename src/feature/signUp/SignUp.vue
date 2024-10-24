<template>
  <div class="text-center">
    <q-img src="src/assets/lock.svg" style="max-width: 220px" />
  </div>

  <div class="full-width" style="max-width: 350px">
    <h3 class="text-center">Sign Up</h3>
    <div>
      <q-card>
        <q-card-section>
          <q-input type="tex" placeholder="Enter Name" class="q-mb-md" />
          <q-input type="text" placeholder="Enter Email" class="q-mb-md" />
          <q-input
            type="password"
            placeholder="Enter Password"
            class="q-mb-sm"
          />
          <q-btn class="full-width" color="primary">Sign Up</q-btn>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  name: 'SignUp',
};
</script>
