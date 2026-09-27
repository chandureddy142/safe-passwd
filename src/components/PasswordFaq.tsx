import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const questions = [
  {
    question: "Is it safe to type my real password here?",
    answer: "Yes. Strength calculations happen locally on your device. For breach checks, only a small part of a one-way password hash is sent, so your complete password is never shared.",
  },
  {
    question: "How do you calculate password strength?",
    answer: "The analyzer checks length, uppercase and lowercase letters, numbers, special characters, predictable number sequences such as 123, and whether the password includes your name.",
  },
  {
    question: "What does ‘found in known breaches’ mean?",
    answer: "The password appears in the Have I Been Pwned database of passwords exposed in past data breaches. If it is found, attackers may already know it and you should not use it.",
  },
  {
    question: "How do I create a strong password I can remember?",
    answer: "Try a long passphrase made from three or four unrelated words with symbols and numbers. It can be easier to remember while remaining difficult to guess.",
  },
];

export function PasswordFaq() {
  return (
    <section id="faq" className="scroll-mt-24" aria-labelledby="faq-title">
      <div className="mb-8 text-center">
        <p className="mb-2 font-mono text-xs font-semibold uppercase text-primary">Clear answers</p>
        <h2 id="faq-title" className="text-2xl font-bold sm:text-3xl">Password FAQ</h2>
        <p className="mt-2 text-sm text-muted-foreground">Everything you need to know about keeping your accounts secure.</p>
      </div>
      <Accordion type="single" collapsible className="grid gap-3 md:grid-cols-2 md:items-start">
        {questions.map(({ question, answer }, index) => (
          <AccordionItem key={question} value={`item-${index}`} className="rounded-lg border border-border bg-card text-card-foreground px-5 backdrop-blur-sm">
            <AccordionTrigger className="text-left text-sm hover:no-underline sm:text-base">{question}</AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}