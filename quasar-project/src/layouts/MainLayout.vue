<template>
  <q-layout view="lHr lpR fFf">

    <q-header bordered class="bg-black text-grey">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{ $route.name }}</span>
          <q-icon
            class="header-icon q-ma-md lt-md"
            name="fa-solid fa-circle-nodes"
            size= "sm"
            color="grey"
          />
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="left"
      side="left"
      :width="283"
      bordered
    >
      <q-icon
        class ="q-ma-md"
        name="fa-solid fa-circle-nodes"
        size = "lg"
        color ="black"
      />
      <q-list>
        <q-item
        to="/"
        clickable
        v-ripple
        exact
        >
          <q-item-section avatar>
            <q-icon name="fa-solid fa-house-user" size ="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
        </q-item>
        <q-item
        to="/about"
        clickable
        v-ripple
        exact
        >
          <q-item-section avatar>
            <q-icon name="fa-solid fa-circle-question" size ="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">About</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-input
        placeholder="Search ChatBox"
        class="q-ma-md"
        outlined
        rounded
        dense
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list
        separator
        padding
        >
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">CURRENT</q-item-label>
            <q-item-label class="text-weight-bold">Happening Now</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Releases</q-item-label>
            <q-item-label class="text-weight-bold">Check Out news on the latest releases</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Esports</q-item-label>
            <q-item-label class="text-weight-bold">Happening Now</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      right: false
    }
  }
}
</script>

<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>
