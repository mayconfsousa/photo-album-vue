<template>
  <div class="modal fade" id="addNewAlbumModal" tabindex="-1" role="dialog" aria-labelledby="addNewAlbumModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addNewAlbumModalLabel">Add new album</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="albumTitle">Album title</label>
            <input type="text" class="form-control" id="albumTitle" maxlength="50" v-model="albumTitle" aria-describedby="albumTitle" placeholder="Enter album title" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="createAlbum()">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return { albumTitle: '' };
  },
  mounted() {
    $('#addNewAlbumModal').on('shown.bs.modal', () => (this.albumTitle = ''));
  },
  methods: {
    createAlbum() {
      if (!this.albumTitle) return;

      this.$nextTick(async () => {
        this.$nuxt.$loading.start();

        this.$store.commit('addAlbum', this.albumTitle);

        this.$nuxt.$loading.finish();
      });
    },
  },
};
</script>
