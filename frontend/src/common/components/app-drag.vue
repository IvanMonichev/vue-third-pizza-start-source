<script setup lang="ts" generic="T extends object">
import { DATA_TRANSFER_PAYLOAD, MOVE } from '@/common/constants/core.constants'

interface Props {
  transferData: T
}

const props = defineProps<Props>()

const onDrag = (e: DragEvent) => {
  const { dataTransfer } = e
  if (!dataTransfer) return
  dataTransfer.effectAllowed = MOVE
  dataTransfer.dropEffect = MOVE
  dataTransfer.setData(
    DATA_TRANSFER_PAYLOAD,
    JSON.stringify(props.transferData)
  )
}
</script>

<template>
  <div
    :draggable="true"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragend.prevent
  >
    <slot />
  </div>
</template>
