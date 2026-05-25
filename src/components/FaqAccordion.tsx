"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * FaqItem supporta sia il formato legacy (answer: string)
 * sia il formato Loonar (content: string come HTML sicuro).
 * Se `content` è presente viene reso come HTML, altrimenti si usa `answer`.
 */
interface FaqItem {
  question?: string;
  /** Titolo proveniente da Loonar (alternativo a question) */
  title?: string;
  answer?: string;
  /** HTML sicuro (sanitizzato da faq-datasource.ts) */
  content?: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  limit?: number;
}

export default function FaqAccordion({ items, limit }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayed = limit ? items.slice(0, limit) : items;

  return (
    <div className="flex flex-col gap-3">
      {displayed.map((item, i) => {
        const isOpen = openIndex === i;
        const label = item.title ?? item.question ?? "";
        const hasHtml = Boolean(item.content);

        return (
          <div
            key={i}
            className={`border transition-colors ${
              isOpen
                ? "bg-white border-gray-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <button
              type="button"
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-[16px] md:text-[17px] font-medium text-primary leading-snug">
                {label}
              </span>
              <span
                className={`material-symbols-outlined flex-shrink-0 text-[24px] leading-none select-none transition-colors ${
                  isOpen ? "text-accent" : "text-primary"
                }`}
                aria-hidden="true"
              >
                {isOpen ? "remove" : "add"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  {hasHtml ? (
                    <div
                      className="px-6 pb-6 text-[15px] md:text-base text-primary/80 leading-relaxed prose prose-sm max-w-none"
                      /* HTML sanitizzato in faq-datasource.ts prima di arrivare qui */
                      dangerouslySetInnerHTML={{ __html: item.content! }}
                    />
                  ) : (
                    <p className="px-6 pb-6 text-[15px] md:text-base text-primary/80 leading-relaxed">
                      {item.answer}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
