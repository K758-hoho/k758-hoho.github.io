---
title: Welcome to my blog!
layout: base.njk
tagline: Hi there! I'm Karin Kho, an aspiring digital artist and junior graphic designer in training. Here is where I post my thoughts and passions.
---

## Featured Works
- [Target Boskval](targetboskval.webcomic.ws)
    My current project, a crime drama webcomic about a struggling illegal drug business.

## Blog
Stay updated with my latest posts:
<ul>
    {% for post in collections.posts %}
    <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
    {% endfor %}
</ul>

Thanks for visiting my blog!