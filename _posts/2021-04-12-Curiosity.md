---
title: Enhanced Curiosity to explore the World 
description: How to build a self learning agent in Complete Information Board Games ?
layout: post
date: 2021-04-12
tags: 
- Reinforcement Learning
- Exploration
- Intrinsic Motivation  
- Animal AI 
image_url: assets/docs/posts/curiosity/images/aai.png
pdf_url: https://arxiv.org/pdf/2105.08568.pdf
git_url: https://github.com/alehuger/AnimalAI-Olympics
permalink: projects/curiosity
---
Reinforcement Learning algorithms are training agents from the reward signal it obtains. Thus, a naïve agent relies on exploration to collect its first rewards. If random action can proved to be efficient in some setting, like illustrated in <a href="https://alehuger.github.io/projects/maze_dqn">Maze DQN </a>; in settings where rewards are sparse, this proves to be overly long and hazardous. This is where curiosity comes at the rescue ! We explain the concepts in 5 points :
<br> <b> How can we make the most of curiosity to explore complex reward-sparse environments ? </b>

## 1. Curiosity Formula

## 2. Relies on Image Encoding and Key encoding

Curiosity should be useful here to encourage exploration. Previous work on curiosity in Atari concluded random feature (RF) encodings are actually pretty good because, while not sufficient, are stable and that's really important for the curiosity signal. <a href="https://arxiv.org/abs/1808.04355"> Paper</a>

## 3. Enhanced State representation for optimal curious exploration


Preliminary experiments support the hypothesis that learning cognitive *abilities* in open-ended environments requires structured task-independent representations. 


## 4. Demonstrated on the Animal AI : X-Maze Tasks

Detour tasks are simple cognitive tasks but hard for AI. They require moving away from a reward in order to get to it, which is impossible with a naive 'go towards good thing' strategy. The top 10 teams in Animal-AI Olympics averaged only 12% success in the <a href="http://animalaiolympics.com/AAI/testbed">AnimalAI Olympics </a> .



Our results show good performance and sample efficiency on detour tasks (VAE>IDF>RF) when learning over a curriculum of increasingly complex tasks. 

<div class="box ">
    <iframe width="800" height="450" src="https://www.youtube.com/embed/P9qPDAinwTQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>



## 5. Transfer to other Detour Environments

We also found zero-shot transfer to other detour tasks is much better with the more structured encoding (VAE than IDF or RF).

<div class="box ">
    <iframe width="800" height="450" src="https://www.youtube.com/embed/tD0za5eAzRg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>
