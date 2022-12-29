<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            class="new-ping"
            bottom-slots
            v-model="newPingContent"
            label="What's Happening?"
            counter
            maxlength="300"
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://i.pinimg.com/564x/4a/cf/16/4acf16a2999a4c6dfdfe03f198b95b13.jpg">
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addnewPing"
            :disable="!newPingContent"
            class="q-mb-lg"
            unelevated
            rounded
            color="grey-9"
            label="ping"
            no-caps
          />
        </div>
      </div>

      <q-separator
        class="divider"
        size="10px"
        color="grey-5"
      />
      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slower"
          leave-active-class="animated fadeOut slower"
        >

        <q-item
          class="ping q-py-md"
          clickable
          v-ripple
          v-for="ping in pings"
          :key="ping.date"
          >
          <q-item-section avatar top>
            <q-avatar size="lg">
              <img src=https://i.pinimg.com/564x/4a/cf/16/4acf16a2999a4c6dfdfe03f198b95b13.jpg />
            </q-avatar>
          </q-item-section>

          <q-item-section top class="col-2 gt-sm">
            <q-item-label class="q-mt-sm text-weight-bold text-subtitle1">
              <span class="text-grey-7">
                @Dubem
              </span>
            </q-item-label>
          </q-item-section>

          <q-item-section top>
            <q-item-label>
              <span class="text-weight-bold cursor-pointer text-uppercase">[Topic]</span>
              <span class="q-mt-xs text-grey-8 text-uppercase text-weight-medium"> - Category
                &bull; {{ ping.date }}
              </span>
            </q-item-label>
            <q-item-label class="ping-content text-body1">{{ ping.content }}
            </q-item-label>
            <q-item-label class="q-mt-xs text-body2 text-weight-bold text-black text-uppercase">
              <span class="cursor-pointer">Open Message</span>
            </q-item-label>
            <div class="ping-icons row justify-between q-mt-sm">
              <q-btn
                flat
                round
                color="grey-9"
                icon="fa-solid fa-comment"
                size="sm"
              />
              <q-btn
                flat
                round
                color="grey-9"
                icon="fa-solid fa-paper-planefa-solid fa-thumbs-up"
                size="sm"
              />
              <q-btn
                flat
                round
                color="grey-9"
                icon="fa-solid fa-paper-plane"
                size="sm"
              />
              <q-btn
              @click="deletePing(ping)"
                flat
                round
                color="grey-9"
                icon="fa-solid fa-trash"
                size="sm"
              />
              <q-btn
                flat
                round
                color="grey-9"
                icon="fa-solid fa-arrow-up-from-bracket"
                size="sm"
              />
            </div>
          </q-item-section>
          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn size="12px" flat dense round icon="more_vert" />
            </div>
          </q-item-section>
        </q-item>
        </transition-group>/
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
import { formatDistance } from 'date-fns'

export default {
  name: 'PageHome',
  data () {
    return {
      newPingContent: '',
      pings: [
        // {
        //   id: 'ID1',
        //   content: 'Be your own hero, its cheaper than a movie ticket.',
        //   date: 1611653238221,
        //   liked: false
        // },
        // {
        //   id: 'ID2',
        //   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat justo id viverra consequat. Integer feugiat lorem faucibus est ornare scelerisque. Donec tempus, nunc vitae semper sagittis, odio magna semper ipsum, et laoreet sapien mauris vitae arcu.',
        //   date: 1611653252444,
        //   liked: true
        // },
      ]
    }
  },
  methods: {
    addnewPing () {
      const newPing = {
        content: this.newPingContent,
        date: Date.now(),
        liked: false
      }
      // this.pings.unshift(newPing)
      db.collection('pings').add(newPing).then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
      }).catch(function (error) {
        console.error('Error adding document: ', error)
      })
      this.newPingContent = ''
    },
    deletePing (ping) {
      db.collection('pings').doc(ping.id).delete().then(function () {
        console.log('Document successfully deleted!')
      }).catch(function (error) {
        console.error('Error removing document: ', error)
      })
    },
    toggleLiked (ping) {
      db.collection('pings').doc(ping.id).update({
        liked: !ping.liked
      })
        .then(function () {
          console.log('Document successfully updated!')
        })
        .catch(function (error) {
        // The document probably doesn't exist.
          console.error('Error updating document: ', error)
        })
    }
  },
  filters: {
    relativeDate (value) {
      return formatDistance(value, new Date())
    }
  },
  mounted () {
    db.collection('pings').orderBy('date').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        const pingChange = change.doc.data()
        pingChange.id = change.doc.id
        if (change.type === 'added') {
          console.log('New ping: ', pingChange)
          this.pings.unshift(pingChange)
        }
        if (change.type === 'modified') {
          console.log('Modified ping: ', pingChange)
          const index = this.pings.findIndex(ping => ping.id === pingChange.id)
          Object.assign(this.pings[index], pingChange)
        }
        if (change.type === 'removed') {
          console.log('Removed ping: ', pingChange)
          const index = this.pings.findIndex(ping => ping.id === pingChange.id)
          this.pings.splice(index, 1)
        }
      })
    })
  }
}
</script>

<style lang="sass">
.new-ping
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.ping:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)
.ping-content
  white-space: pre-line
.ping-icons
  margin-left: -5px
</style>
