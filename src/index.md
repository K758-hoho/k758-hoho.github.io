---
title: KARIN KHO
layout: base.njk
description: The official blog of Karin Kho, an aspiring artist who makes comics and talks about things.
images:
  - "https://res.cloudinary.com/dkvkq02fo/image/upload/v1739437014/banner_500x90px_spbpef.webp"
---

# KARIN KHO
Oh hey, you found me! I'm Karin Kho, an aspiring digital artist and junior graphic designer in training. This is where I post my thoughts and passions.

## Featured Works
<div style="text-align: center;">
  <a href="https://targetboskval.webcomic.ws">
    <img src="https://res.cloudinary.com/dkvkq02fo/image/upload/v1739437014/banner_500x90px_spbpef.webp" alt="Target Boskval">
  </a>
  <p><em>My current project, a crime drama webcomic about a struggling illegal drug business. You can read more by clicking the image.</em></p>
</div>

## Blog
Stay updated with my latest posts:
<ul>
    {% for post in collections.posts %}
    <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
    {% endfor %}
</ul>