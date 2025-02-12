---
title: Home
layout: base.njk
---

## Welcome to my blog
Hi there! I'm Karin Kho, an aspiring digital artist and junior graphic designer in training. Here is where I post my thoughts and passions.

## Featured Works
- [Target Boskval](targetboskval.webcomic.ws)
    My current project, a crime drama webcomic about a struggling illegal drug business.

## Blog
Stay updated with my latest posts:
{% for post in collections.posts %}
{{ post.data.title }}
{% endfor %}

## Contact
Feel free to reach out for commissions or collaborations:
- Email: [your-email@example.com](mailto:your-email@example.com)
- Social Media: [Your Instagram](link-to-instagram), [Your Twitter](link-to-twitter)


Thanks for visiting my blog!