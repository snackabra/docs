.. _motivation:

=================
Motivation
=================

The 384 platform is built on a number of core concepts that are essential to the design of a decentralized
storage platform. Each of these concepts is explained in more detail below. 

Zero Trust
~~~~~~
Cloudflare's learning page succinctly summarizes what Zero Trust is and why it is important here.

Traditional IT network security trusts anyone and anything inside the network. A Zero Trust architecture trusts no one and nothing. Traditional IT network security is based on the castle-and-moat concept. In castle-and-moat security, it is hard to obtain access from outside the network, but everyone inside the network is trusted by default. The problem with this approach is that once an attacker gains access to the network, they have free rein over everything inside. This vulnerability in castle-and-moat security systems is exacerbated by the fact that companies no longer have their data in just one place. Today, information is often spread across cloud vendors, which makes it more difficult to have a single security control for an entire network. Zero Trust security means that no one is trusted by default from inside or outside the network, and verification is required from everyone trying to gain access to resources on the network. This added layer of security has been shown to prevent data breaches. Studies have shown that the average cost of a single data breach is over $3 million. Considering that figure, it should come as no surprise that many organizations are now eager to adopt a Zero Trust security policy.

384 is built on the Zero Trust model...to be continued...

Local-first software
~~~~~~
Local-first software is an approach to software design that prioritizes the user's control and ownership of their data. The idea is to build software applications that work offline and store data locally either on device or on the edge, while also allowing for synchronization with other devices and the cloud.

The 384 platform facilitates the creation of local first software by design. Our platform allows you to load an app locally from a shard and run it on whichever data you decide to give it. This flips the traditional SaaS model of uploading your data to some third-party server that then does processing on it. Since the app can run locally in the browser, it can also take advantage of all the latest features of Web APIs to build a PWA that works offline. This gives you the privacy, security, and performance of local desktop applications, but also the convenience and redundancy of the cloud. It was previously thought that web browsers were not a good way to make local first applications, but with advances in browser capability and increasing access to native compute and storage through APIs, it is more than possible, and in our opinion preferable.

Key Management
~~~~~~
Key management refers to the process of handling cryptographic keys throughout their lifecycle. It involves generating, distributing, storing, protecting, revoking, and ensuring the availability and integrity of keys, as well as implementing policies and selecting appropriate algorithms and key lengths. Effective key management is essential for maintaining the security and confidentiality of sensitive information.

Imagine now that key management is done by some third party, on some infrastructure that you don't know. Doesn't that seem antithetical to privacy and security? Not only do you have to trust that they are not prying their eyes into your data, but you also must trust the integrity of their infrastructure. With 384, since key management is done in the client, the specific cloud infrastructure that our services are being run on does not matter, and they can even be insecure. Your data is never unencrypted in transit or in rest anywhere besides the client.

Data Sovereignty
~~~~~~
There are many conflicting definitions of data sovereignty, but what we feel is essential about this concept is that the individual has control over their personal data and digital identity, including the ability to determine how and where their data is collected, processed, and shared. It encompasses the rights of individuals/companies to privacy, security, and autonomy in their digital lives.

384 is designed to facilitate this by providing a platform that fundamentally flips the power imbalance between the user and the service provider. The user has complete control over their data, and the application level has no access to it unless the user explicitly grants it. This is in contrast to the traditional model of data being stored and processed in a centralized location.

Open Source
~~~~~~
To be written...

Public Key Cryptography as Identity
~~~~~~
To be written...
