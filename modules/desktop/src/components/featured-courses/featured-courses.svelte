<script lang="ts">
  import "$appcss";
  import { t } from "$libs/translations";
  import { postsStore } from "$libs/stores";
  import type { Course } from "$libs/types";

  import Gallery from "@tea/ui/gallery/gallery.svelte";

  let courses: Course[] = [];

  postsStore.subscribeByTag("featured_course", (posts) => {
    courses = posts.map((post) => {
      return {
        title: post.title,
        sub_title: post.sub_title,
        banner_image_url: post.thumb_image_url,
        link: post.link
      } as Course;
    });
  });
</script>

<Gallery
  title={$t("documentation.featured-courses-title").toUpperCase()}
  items={courses.map((course) => ({
    title: course.title,
    subTitle: course.sub_title,
    imageUrl: course.banner_image_url,
    link: course.link
  }))}
  linkTarget="_blank"
/>
