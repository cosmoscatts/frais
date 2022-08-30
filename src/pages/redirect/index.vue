<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { params: { path }, query } = route
router.replace({ path: `/${path}`, query })
</script>

