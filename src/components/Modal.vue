<template>
    <transition name="modal-fade" appear>
        <div class="modal-backdrop" >
            <div class="modal"
                role="dialog"
                aria-labelledby="modalTitle"
                aria-describedby="modalDescription"
                >
                <header  class="modal-header" id="modalTitle">
                    <slot name="header">
                      <transition name="modal-fade" mode="out-in" appear>
                      <p>{{update}}</p>
                      </transition>
                        <span
                        style="cursor:pointer;"
                        @click="close"
                        aria-label="Close modal"
                        >&times;</span>
                    </slot>
                </header>
                
                <section class="modal-body" id="modalDescription">
                    <app-edit @loading="change" name="body" :id="getCurrentEdit.id" :msg="getCurrentEdit.message">
                       
                    </app-edit>
                </section>

                <footer class="modal-footer">
                    <slot name="footer">
                        <!-- <button
                        type="button"
                        class="btn-green"
                        @click="close"
                        aria-label="Close modal"
                        >
                        Close me!
                      </button> -->

                    </slot>
                </footer>
            </div>
        </div>
  </transition>
    
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Edit from '../components/EditNote'
    export default {
        data(){
          return {
            update: 'edit'
          }
        },
        name: "modal",
        computed: {
            ...mapGetters(['getCurrentEdit'])
        },
        methods: {
            close(){ 
                this.$store.dispatch('closeModal')
            },
            change(value){
              this.update = value
            }
        },
        components: {
          appEdit: Edit
        }
        
    }
</script>
<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
  

  .modal {
    position: relative;
    background: #f8f9fa;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    height: 55vh;
    width: 25rem;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

    .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }

  @media (max-width: 800px){
    .modal {
      height: 43vh;
      width: 20rem;
    }
  }

</style>