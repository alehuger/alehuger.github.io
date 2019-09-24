---
title: 3D Skeleton Reconstruction from Biplanar Radiographs
layout: post
date: 2019-09-15
tags: 
- Convolutionnal Neural Nets 
- Stereovision 
- 3D Mesh Modeling
image_url: assets/docs/posts/images/eos2.png
permalink: Stereovision
---

Initially, the reconstruction relied on a single algorithm that detected the center of the spine vertebrae and inferred a 3D spine mesh with statistical shape model. Today, it has become much more complex and bigger project. Joint endeavours from the whole IA team and the LIO doctoral students have shaped a new reconstruction algorithm. 

<h2>Intro </h2>

<p>
It is now made of various deep learning networks and several statistical models to model the vertebral spine with the utmost precision in order to increase the 3D reconstruction accuracy and extract relevant clinical parameters.
</p>

The learning architecture follows the same architecture investigated in the Local Fit Detection, see Figure 31. There are two branches, each branch has two canals : one for the radio input, the other for the associated DRR patch. Each branch has a sequence of convolution blocks (3 in the figure). Each convolution block starts with a dropout layer, then a convolutional layer is applied, followed by a ReLu activation function and a max pooling. All these layers come with parameters described later on. After this sequence of convolution blocks, the two branch are concatenated into one layer and two dense layers follow. The output is inferred by a linear activation function. The first loss function chosen for this network was the Mean Square Error (MSE). A snapshot of the code used can be seen in the appendices 