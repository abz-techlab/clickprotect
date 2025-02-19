Clickjacking (also known as ‘UI redressing’[2]) is an act of hijacking user clicks in order
to perform undesired actions which are beneficial for the attacker. This attack was
introduced in 2008 by Robert Hansen and Jeremiah Grossman [1]. The attacker tricks the
user to perform such clicks to conduct state changing actions or to extract sensitive
information without the user’s consent. It potentially reveals the confidential information
of user or takes control of users’ computer while clicking. When the user gives the input
that was asked, an event is sent to the malicious page (usually a click event) that causes
undesirable action to be taken on the user’s behalf. These inputs can be username,
passwords, emails, etc. Clickjacking can result in severe loss to users by thieving
personal data such as bank account information, credit card credentials, etc.
Clickjacking attacks can be implemented by compromising one of the three integrities
[1]:
 Target display integrity
 Pointer integrity
 Temporal integrity

