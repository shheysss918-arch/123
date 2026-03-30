import { Sidebar } from "@/components/dashboard/sidebar"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    id: "1",
    question: "System requirements to use our software",
    answer: "Our software requires Windows 10 or 11 (64-bit), a minimum of 8GB RAM, and a compatible graphics card. Make sure your system is up to date with the latest Windows updates.",
  },
  {
    id: "2",
    question: "Refund policy",
    answer: "We offer refunds within 24 hours of purchase if the product has not been used. After 24 hours or if the product has been activated, refunds are not available. Please contact support for assistance.",
  },
  {
    id: "3",
    question: "Purchasing with crypto",
    answer: "We accept Bitcoin, Ethereum, and Litecoin. Crypto payments are processed through our secure payment gateway. After payment confirmation, your license will be delivered within 10-30 minutes.",
  },
  {
    id: "4",
    question: "Issue with a crypto payment",
    answer: "If you experience issues with a crypto payment, please wait at least 30 minutes for network confirmations. If your payment is still not processed, contact support with your transaction hash.",
  },
  {
    id: "5",
    question: "Time compensation",
    answer: "If our service experiences downtime, we provide time compensation to all affected users. Compensation is automatically added to your subscription based on the duration of the outage.",
  },
  {
    id: "6",
    question: "How do i remove the cheat from my PC?",
    answer: "To remove the software, simply run the uninstaller from the installation folder or use Windows Add/Remove Programs. All files will be automatically cleaned up.",
  },
  {
    id: "7",
    question: "Do you have a Discord?",
    answer: "Yes, we have an active Discord community where you can get support, updates, and interact with other users. Join link is available in your dashboard after purchase.",
  },
  {
    id: "8",
    question: "How do i become a reseller?",
    answer: "To become a reseller, you need to have a minimum of 50 sales history and contact our business team. Resellers receive special pricing and support.",
  },
  {
    id: "9",
    question: "Do you ever do giveaways?",
    answer: "Yes! We regularly host giveaways on our Discord server. Follow our announcements to participate in weekly and monthly giveaways.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="ml-48 min-h-screen p-6">
        <Badge className="mb-4 bg-primary text-primary-foreground">FAQ</Badge>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-lg border border-border bg-card px-4"
            >
              <AccordionTrigger className="text-left text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  )
}
