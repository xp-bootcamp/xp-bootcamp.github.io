---
layout: column
permalink: /tdd
title: "TDD"
summary: TDD
tag: tdd
author: "袁慎建"
date: 2020-03-15
active: "TDD"
---

* content
{:toc}


## 什么是 TDD？
TDD，Test Driven Development，由极限编程创始人Kent Beck提出，它是XP（eXtreme Programming，极限编程）中的一项核心实践。

{% include column-image.html name = 'xp-circle.png' %}

TDD 采用了一种以终为始的思维方式，在开发业务功能代码之前，先编写测试代码。测试代码确定了我们要验收什么以及如何验收，然后再去编写功能代码，当测试通过时，便代表功能完成。

在实践过程中，人们常常将TDD区分为广义TDD和狭义TDD。广义的TDD是ATDD（Acceptance Test Driven Development），狭义的TDD，常常说的是UTDD（Unit Test Driven Development）。
本文所说的TDD更多指狭义上的TDD，也就是「单元测试驱动开发」。

在实践TDD的过程中，我们对TDD形成了三层理解：

- Task-Driven Development，任务驱动开发。
- Test-Driven Development，测试驱动开发。
- Test-Driven Design，测试驱动设计。


### Task-Driven Development


### Test-Driven Development


### Test-Driven Design

> TDD并不会驱动出好的设计，TDD只会给你及时的反馈什么可能是糟糕的设计 -- Kent Beck


## 为什么要 TDD


### 分离关注点
TDD的方式，写测试代码时，我们只关注功能验收。写功能代码时，只关注如何通过验收，很好分离了我们的关注点，降低思维的负担，帮助专注聚焦，提升开发效率。


### 构建保护网
TDD 的好处是覆盖完全的单元测试，为功能代码提供了一个保护网，让我们可以轻松地迎接需求变化或重构代码。

### 及时澄清需求
先写测试可以帮助我们去思考需求，并提前澄清需求细节，而不是代码写到一半才发现不明确的需求。

### Debug Free
有很多人说 TDD 时，我的代码量增加了，所以开发效率降低了。但是，如果没有单元测试，你就要手工测试，你要花很多时间去准备数据，启动应用，跳转界面等，反馈是很慢的。准确说，快速反馈是单元测试的好处。

## 怎么做TDD？

### TDD流程
TDD的基本流程是：红，绿，重构。更详细的流程是：

- 编写一个测试用例
- 运行测试
- 编写刚好能让测试通过的实现
- 运行测试
- 重构代码
- 运行测试
- 编写下一个测试用例
- ......
