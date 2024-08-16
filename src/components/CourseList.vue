<!-- src/components/CourseList.vue -->
<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'CourseList',
  setup() {
    const courses = ref([]);

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/courses');
        courses.value = response.data;
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    onMounted(fetchCourses);

    return {
      courses,
    };
  }
}
</script>