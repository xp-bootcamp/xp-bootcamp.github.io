---
layout: column
permalink: /tdd
title: "TDD"
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
任务拆解是TDD的一个关键的步骤。在开始编写进入代码环节之前，需要对业务需求做拆分，这个过程我们把它称之为Tasking。比如，一个用户登录的业务需求，我们大体可以拆分成如下几个Task：

1. 假定用户名不存在时，当用户登录，则登录失败
2. 假定用户名正确且密码错误时，当用户登录，则登录失败
3. 假定用户名和密码都正确时，当用户登录，登录成功

通过上面的三个Tasking，可以总结出一个模式：Given When Then：

1. Given 用户名不存在，When 用户登录， Then 登录失败
2. Given 用户名正确且密码错误，When 用户登录， Then 登录失败
3. Given 用户名和密码都正确，When 用户登录， Then 登录成功

Given When Then借鉴了BBD（Behavior Driven Development）里面的模式，它更加关注用户如何使用系统，即系统所提供的功能，从理解上更偏向于业务语言。对于一些技术人员，在初学阶段，需要多去练习，体会不同点，可以选业务人员视角索要一些反馈。

在TDD中，我将之称为Tasking三步曲：

- Given，代表特定的业务场景
- When，代表用户发生的行为
- Then，代表行为产生的结果


### Test-Driven Development
测试驱动开发，有了拆分好的一个个Task，此时需要将这些Task用测试用例代码进行翻译，


### Test-Driven Design
> TDD并不会驱动出好的设计，TDD只会给你及时的反馈什么可能是糟糕的设计 -- Kent Beck


## 为什么要 TDD？


### 及时澄清需求
Task Driven Development，我们拿到业务需求后会做Tasking，通过Tasking梳理业务需求，将一个大问题进行拆解后，从而能够深入理解业务细节。把一个个业务场景拆分罗列出来后，我们基本上对业务了如指掌，同时你也可以拿着这份拆分结果，去找业务人员确认理解，以及澄清一些疑惑点。这个过程恰好体现了敏捷的核心精髓 -- 及时反馈。

通过前期的反馈，能够避免因为业务需求理解偏差付出的无用功。

### 培养团队新人
如果团队来了几个新人，你需要带他们快速进入正常的业务开发，而迫于优先的精力，你不能做到同时跟几个人Pair。教会他们拆分业务需求，做Taskin是非常有帮助。你能够从新人的Tasking结果中识别他们对业务需求的理解是否正确，提前给出指导反馈，控制好方向。

另外，培养新人以终为始的这种思维习惯也是对他们的职业生涯有益的。


### 分离关注点
TDD的方式，写测试代码时，我们只关注功能验收，而且只关注Tasking出来一个Task（业务场景）。写功能代码时，只用关注如何通过验收。通过了验收后，你只用关注代码重构上。这个过程很好分离了我们的关注点，降低思维的负担，帮助专注聚焦，有效地提升开发效率。


### 构建保护网
TDD的一个必然结果产生是高价值、高覆盖的单元测试，为功能代码提供了一个保护网。这样一来，我们可以充满信息地进行代码重构，去改善我们的代码设计。


### 减免调试
可能你会发现，采用TDD后，代码量会增加，貌似开发效率就会降低了。试想一下，如果没有单元测试，你就要手工测试，在准备数据、启动应用、界面操作等事项上会花费你很多时间，很多工作还需要重复去做，并且获得反馈较慢。

有了单元测试，你可以省去很多重复的手工操作，每次运营能够快速获得反馈，减免了很多繁琐的调试工作。


## 怎么做TDD？

### TDD流程
我们常说，作为一个TDDer，要时刻切换三顶帽子（红帽子、绿帽子~、蓝帽子），其实是说的是TDD的个过程：红（编写测试）、绿（编写实现）、蓝（重构）


{% include column-image.html name = 'tdd-circle.png' %}

对于初学者，在做TDD的时候，有一个更加详细的流程供我们参考：

{% include column-image.html name = 'tdd-process.png' %}


我才新写了一个测试用例，明知道它会运行失败（另外还有编译错误），还要运行吗？

我建议你运行一下，首先，作为新手，这是一种节奏感和习惯的养成，一些行为习惯会潜移默化地影响你思考方式。其次，测试失败有很多种情况，你需要通过运行测试来获得反馈，这个失败是不是你期望的失败，比如：
- 如期失败：是不是我接口还不存在，编译错误？那我需要去实现我的接口。
- 如期失败：是不是我功能接口没有实现，断言失败？那我接下就需要去实现功能。
- 非如期失败：是不是我不小心手误改了测试代码，导致其他的也失败了？那我需要当心了
- 非如期成功，测试通过了，我的测试是不是写的有问题？那我需要当心了

通过这种方式，节省了大量的调试代码的时间。

### 三条童子军规
- 没有测试之前不要写任何功能代码。
- 一次只写一个刚好失败的测试，作为新加功能的描述。
- 不写任何多余的产品代码，让它刚好能让失败的测试通过就好


## TDD相关书籍
- [《编写可读代码的艺术》](https://book.douban.com/subject/10797189/)
- [《代码整洁之道》](https://book.douban.com/subject/4199741/)
- [《测试驱动开发》](https://book.douban.com/subject/1230036/)
- [《有效的单元测试》](https://book.douban.com/subject/26364867/)
- [《实例化需求》](https://book.douban.com/subject/11611022/)
- [《重构》](https://book.douban.com/subject/4262627/)

