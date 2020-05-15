<template>
  <div>
    <q-btn @click="onPickFile" icon="image" color="primary" class="full-width" outline rounded label="Upload Google map screenshot" />
    <q-input type="file" style="display:none" ref="fileInput" accept="image/*" @change="uploadImage" />
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'UploadGoogleMap',
  props: [
    'house_id'
  ],
  methods: {
    onPickFile () {
      this.$refs.fileInput.$el.click()
    },
    uploadImage (event) {
      let file = event.target.files[0]
      var storageRef = firebase.storage().ref('googlemap/' + file.name)
      let uploadTask = storageRef.put(file)
      uploadTask.on('state_changed', snapshot => {
      }, error => {
        console.log(error)
      }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        console.log('Upload Succesfull')
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        //   this.images.push(downloadURL)
          this.$store.dispatch('firestore/addGoogleMap', {
            id: this.house_id,
            image: downloadURL
          })
        })
      })
    }
  }
}
</script>
