import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useCourseMeta() {
  const route = useRoute();
  const router = useRouter();

  const level = ref(route.params.level);
  const courseCode = ref(route.params.course);
  const courseData = ref({});
  const courses = ref([]); // To store the loaded courses from JSON

  // Generate breadcrumbs based on the current route
  const breadcrumbs = ref([
    { title: 'Home', link: '/' },
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Past Questions', link: '/dashboard/questions' },
    {
      title: `${level.value}L`,
      link: `/dashboard/questions/${level.value}`,
    },
    {
      title: `${courseCode.value}`,
      link: `/dashboard/questions/${level.value}/${courseCode.value}`,
    },
  ]);

  const fetchCourseDetails = async () => {
    try {
      // Dynamically import the course JSON file based on the level
      const module = await import(`../courses/${level.value}L.json`);
      courses.value = module.default;
      const foundCourse = courses.value.find(
        (c) => c.coursecode === courseCode.value
      );
      if (foundCourse) {
        courseData.value = foundCourse;
      } else {
        console.error(
          `Course with code ${courseCode.value} not found in level ${level.value}`
        );
        router.push('/not-found'); // Redirect if course is not found
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
      // Optionally, redirect to an error page or show a toast message
      // router.push('/500'); 
    }
  };

  return {
    level,
    courseCode,
    courseData,
    breadcrumbs,
    fetchCourseDetails,
  };
} 