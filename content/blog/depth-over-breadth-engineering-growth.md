---
date: 2026-04-30
title: Depth Over Breadth - Why Your Best Engineers Don't Read the Most
tags:
  - leadership
  - engineering-culture
  - career-growth
  - management
---

I scroll LinkedIn as much as the next developer. Between the hot takes, the framework announcement hype, and the "I migrated our entire stack to X in a weekend" posts, there's a clear trend in our developer society: bleeding edge is king. And the benefits are obvious, right? Posting about the latest tech gets you engagement, looks great on a resume, and makes you seem like you're at the forefront of the industry. I've heard it in casual conversations with other devs too—"Oh, you're not using X yet? It's the new standard." All because someone read a blog post or watched a 10-minute tutorial.

But here's what I've noticed, and it was validated by a manager's LinkedIn post I read recently: we're optimizing for breadth over depth, and it's hurting us. 

That post stuck with me because it described exactly what I see every day. The manager led 145 engineers, and noticed that every Monday, half the team came in with strong opinions on three new tools they'd read about over the weekend. New frameworks, new libraries, new AI patterns—all adopted on a whim, none actually understood. The volume of information wasn't the problem. The depth was.

They shared a story about a design review where a senior engineer proposed switching their message queue to a system he'd read about that morning. Eight minutes of reading, pretty benchmarks, clean diagrams. But when asked three basic questions about cross-region failover, he couldn't answer a single one. The room went quiet, because everyone knew they'd have failed the same test.

That's exactly what I see in comments sections, in LinkedIn threads, in casual lunch conversations. Everyone's an expert on the new hotness after a 5-minute skim. 

The manager realized their team was prioritizing skimming over expertise—something I've watched play out in dev spaces for years. We share newsletters, forward articles, drop links in Slack, all in the name of "staying current." But none of it translates to actual skill. It trains us to skim, not to understand.

Their solution? Each engineer picks one domain per quarter and goes deep. Not a blog post, not a 12-minute YouTube video. Build something. Break it. Document why it broke. Defend it in a review.

The pushback was immediate, just like I'd expect from the dev community. "You're killing curiosity!" But the manager's response was perfect: curiosity that fits in a tweet isn't curiosity. It's reflexive scrolling with extra steps.

By the third quarter, the results were undeniable. Architecture decisions got sharper. Fewer abandoned migrations. They went from evaluating 23 new tools a quarter to 7, and actually shipped all 7. The engineers who got promoted? The ones who picked one hard problem and lived in it for a year. The ones skimming stayed exactly where they were, telling everyone they were "learning."

This aligns perfectly with what I see in our industry. The developers who actually change teams, who get promoted, who build systems that last—they're not the ones reading the most LinkedIn posts or newsletters. They're the ones who understood one thing well enough to bet on it. All the clout from posting about the latest framework doesn't matter if you can't explain why it's better, or how to fix it when it breaks.

---

## Deep Dive Topics

If you're ready to go deep instead of wide, here are five topics worth spending a quarter on:

### 1. Personalizing a Self-Use AI (PIA)

**The Deep Dive:** Build a system that actually understands your workflows, context, and decision patterns  
**Reference:** [Daniel Meissler's article on Personal AI](https://danielmiessler.com/blog/personal-ai-infrastructure)  
**Why it matters:** Most engineers implement AI features based on hype cycles and blog posts. But building a personal AI requires deep study of prompt engineering, context window management, vector databases, and model fine-tuning. You can't skim your way to a system that actually augments your thinking.  

### 2. Trade-offs in Event-Based Architecture
**The Deep Dive:** Understand what costs vs benefits must be considered  
**Why it matters:** Event-driven systems are the default answer in every architecture discussion now. But understanding when events create coupling, when eventual consistency breaks your business requirements, and how to debug distributed flows across 40+ services requires building and breaking multiple implementations. A blog post won't teach you why your events are causing race conditions at 3 AM.  

### 3. Incident Response & Learning Culture

**The Deep Dive:** Move beyond postmortem templates to building a true learning organization  
**Why it matters:** Every team runs postmortems. Few actually change their systems or culture based on them. Going deep means studying cognitive psychology, blameless analysis techniques, and how to build institutional memory that prevents recurrence. You need to understand human factors engineering, not just fill out a "5 Whys" worksheet you downloaded from a Medium article.  

### 4. Team Cognitive Load Management

**The Deep Dive:** Measure and optimize what your teams can actually handle  
**Why it matters:** "Agile best practices" blog posts will tell you to "keep teams small" and "maintain velocity." But understanding the difference between intrinsic, extraneous, and germane cognitive load—and how your architecture decisions directly impact team capacity—requires studying organizational design, flow metrics, and the Dunbar number in engineering contexts. You can't tweet your way to understanding why your "high-performing" team is burning out.  

### 5. Production Readiness Criteria (Your Version, Not Google's)

**The Deep Dive:** Define what "ready" actually means for YOUR system  
**Why it matters:** Copying Google's production checklist is a great way to waste three months on compliance theater while missing the one thing that will actually wake you up at 2 AM. Going deep means understanding your specific failure modes, your users' tolerance for different types of degradation, and building observability that answers questions you haven't thought of yet. Your system's "ready" looks nothing like Netflix's, and a blog post won't help you find that difference.  

---

*Pick one. Go deep. Build something. Break it. Document it. That's the promotion path.*
