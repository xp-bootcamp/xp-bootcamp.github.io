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

测试驱动开发是一种软件开发过程，源于1999年Kent Beck《Extreme Programming Explained》一书中的测试先行这一概念。Kent Beck在2003年再次提到 -- TDD鼓励简单的设计并激发信心。经过后期的发展，TDD已经成长为一门独立的软件开发技术，其名气甚至盖过了极限编程。

{% include column-image.html name = 'xp-circle.png' %}


TDD采用了一种以终为始的思维方式，它依赖于非常短的开发周期的重复：先将需求转换为非常具体的测试用例，然后改进代码，从而让测试通过。实际编码过程体现为：在开发业务功能代码之前，先编写测试代码。测试代码确定了我们要验收什么以及如何验收，然后再去编写功能代码，当测试通过时，代表功能完成。

在实践过程中，人们常常将TDD区分为广义TDD和狭义TDD。广义的TDD是ATDD（Acceptance Test Driven Development），狭义的TDD，常常说的是UTDD（Unit Test Driven Development）。
本文所说的TDD更多指狭义上的TDD。

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
上一步Tasking拆分好的一系列Task，经过沟通澄清之后，就可以将这些Task翻译成测试。在翻译的过程中需要注意的一个核心点是 -- 保持业务概念的统一（统一语言的应用）。如何理解这一点呢，来个看一个Task：

> Given 一个有空位的停车场，When 停车，Then 停车成功，返回一张票据

翻译成测试代码后：

```java
@Test
void should_return_ticket_when_parking_given_a_parking_lot_has_available_space(){
	ParkingLot parkinglot = new ParkingLot(1);
	String car = "布加迪"
	String ticket = parkinglot.park(car);
	assertNotNull(ticket)
}
```
在上述测试代码中，car和ticket都是用了字符串来表示（基本类型偏执），车和票据这两个业务概念没有体现出来，建议是使用`Car`和`Ticket`来代替这两个业务概念。

极限的TDD，会将以终为始的思维运用到极致。它提倡在写测试用例的时候，先写断言，然后一步一步往前倒逼驱动出来测试代码，比如上述的例子，经历的过程如下：

```java
{
	// 1. 我最终要验收的是停车票，代表停车成功
	assertNotNull(ticket); 
}

{
	// 2. 停车票是停车后返回的
	Ticker ticket = parkinglot.park(car); 
	assertNotNull(ticket)
}

{
	// 3. 停的车是我新开进来的车
	Car car = new Car();  
	Ticker ticket = parkinglot.park(car); 
	assertNotNull(ticket)
}

@Test
void should_return_ticket_when_parking_given_a_parking_lot_has_available_space()
{
	// 4. 停进了有空位的停车场
	ParkingLot parkinglot = new ParkingLot(1); 
	Car car = new Car();
	Ticker ticket = parkinglot.park(car);
	assertNotNull(ticket)
}
```

这种方式在刚开始是很难做到的，但是通过多次可以练习，形成这种行为习惯，内化成思维习惯，也是益处多多，非常建议你去刻意练习。


### Test-Driven Design
> TDD并不会驱动出好的设计，TDD只会给你及时的反馈什么可能是糟糕的设计 -- Kent Beck

在《百问TDD》中有一个问题能够很好地解释这一点，它是[测试如何驱动设计？]({{ site.url | append: '/tdd/questions/001'}})


## 为什么要 TDD？


### 及时澄清需求
Task Driven Development，我们拿到业务需求后会做Tasking，通过Tasking梳理业务需求，将一个大问题进行拆解后，从而能够深入理解业务细节。把一个个业务场景拆分罗列出来后，我们基本上对业务了如指掌，同时你也可以拿着拆分结果，去找业务人员沟通确认，以及澄清一些疑惑点。这个过程恰好体现了敏捷的核心精髓 -- 及时反馈。

通过前期的反馈，能够避免因为业务需求理解偏差付出的无用功。

### 促进新人培养
如果团队来了几个新人，你需要带他们快速进入正常的业务开发，而迫于有限的精力，你不能做到同时跟几个人Pair。此时，教会他们Tasking是非常有帮助。你能够从新人的Tasking结果中能够快速确认他们对业务需求的理解是否正确，提前给出指导反馈，控制好方向。

另外，培养新人以终为始的这种思维习惯也是对他们的职业生涯有益的。


### 分离关注点
TDD的方式，写测试代码时，我们只关注功能验收，而且只关注特定的一个Task。写功能代码时，只用关注如何完成本次验收，即让当前的测试用例通过。测试通过后，你只用关注代码设计上，思考要不要将代码从刚刚可用的状态改良成简洁可用的状态。这个过程很好分离了我们的关注点，降低思维的负担，帮助专注聚焦，有效地提升开发效率。


### 构建保护网
TDD的一个必然结果产生是高价值、高覆盖的单元测试，为功能代码提供了一个保护网。这样一来，我们可以充满信心地进行代码重构，去改善我们的代码设计。

另外，相信你在项目上遇到过因为代码集成造成的功能破坏，这种情况多半是代码没有足够测试覆盖，集成时被破坏后没法及时发现。反馈延迟，必然增加维护成本，所以通过构建测试保护网，将大大缓解这种痛点。


### 减免调试
可能你会发现，采用TDD后，代码量会增加，貌似开发效率就会降低了。试想一下，如果没有单元测试，你就可能要手工测试（如果你还是一位负责人的专业程序员）。那么，手工测试时，在准备数据、启动应用、界面操作等事项上会花费你很多时间，而且大多数工作还需要重复去做，并且获得反馈周期拉长。

有了单元测试，你可以省去很多重复的手工操作，每次运行测试能够快速获得反馈，减免了繁琐的调试工作。


## 怎么做TDD？

### TDD流程
我们常说，作为一个TDDer，要时刻切换三顶帽子（红帽子、绿帽子~ ~、蓝帽子），其实是说的是TDD的过程：红（编写测试）、绿（编写实现）、蓝（重构）


{% include column-image.html name = 'tdd-circle.png' %}

对于初学者，在做TDD的时候，有一个更加详细的流程供我们参考：

{% include column-image.html name = 'tdd-process.png' %}


我才新写了一个测试用例，明知道它会运行失败（另外还有编译错误），还要运行吗？

我建议你运行一下。

首先，作为新手，这是一种节奏感和习惯的养成，一些行为习惯会潜移默化地影响你思考方式。其次，测试失败有很多种情况，你需要通过运行测试来获得反馈，这个失败是不是你期望的失败，比如：

- 如期失败：是不是接口还不存在，编译错误？那我需要去实现我的接口
- 如期失败：是不是新功能逻辑还没有实现，断言失败？那我接下就需要去实现新功能
- 非如期失败：是不是不小心手误改了测试代码，导致其他的也失败了？那我需要当心了
- 非如期成功，测试通过了，我的测试是不是写的有问题？那我需要当心了


### 三条童子军规
在美国童子军中，流传一条这样的军规：`让营地比你来时更干净`。Bob大叔在他的《代码整洁之道》中也引用这个词，提倡持续改进 -- 作为一个专业高素养的程序员，要尽全力让项目代码随着时间流逝而越变越好。那么借用这个说法，在TDD中，我们也提倡三条童子军规：

- 没有测试之前不要写任何功能代码
- 一次只写一个刚好失败的测试，作为新加功能的描述
- 不写任何多余的产品代码，让它刚好能让失败的测试通过就好

如果违反了这几条童子军规，会怎么样呢？

- 违反第一条，如果先编写了产品代码，那这段代码实现了什么业务需求呢？你又怎么确保它真的实现了呢？手工测试，太费时间。后补测试，交付压力这么大，还是先写新功能吧。
- 违反第二条，如果写了多个测试，测试长时间没法通过，会增加开发者的心里压力。实际上，伴随着知识的积累，业务细节的深入，Task会发生变更，测试会随之修改，那之前写的测试就成了累赘。
- 违反第三条，产品代码实现了超出当前测试的功能，这部分代码就没有测试的保护，又回到第一条了。另外，多些的代码可能是不存在的需求，增加了没必要的复杂性。


据我观察，别说TDD的初学者，就是有一定经验的TDDer，也很难时刻做到一次只编写刚好让测试通过的功能代码。我还见过有些人一上来写上10来个测试用例。那么在实践练习的过程中，在开始守（守、破、离）的阶段，可以时刻用这三条军规提醒自己。


## TDD相关书籍
- [《编写可读代码的艺术》](https://book.douban.com/subject/10797189/)
- [《代码整洁之道》](https://book.douban.com/subject/4199741/)
- [《测试驱动开发》](https://book.douban.com/subject/1230036/)
- [《有效的单元测试》](https://book.douban.com/subject/26364867/)
- [《实例化需求》](https://book.douban.com/subject/11611022/)
- [《重构：改善既有代码的设计》](https://book.douban.com/subject/4262627/)


## 参考阅读
- [eXtreme Programming](https://en.wikipedia.org/wiki/Extreme_programming)
- [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)

