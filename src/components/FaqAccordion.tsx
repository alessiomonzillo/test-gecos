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
  variant?: "faq" | "valori";
}

export default function FaqAccordion({ items, limit, variant = "faq" }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(variant === "valori" ? 1 : 0);
  const displayed = limit ? items.slice(0, limit) : items;

  return (
    <div className="flex flex-col gap-[18px]">
      {displayed.map((item, i) => {
        const isOpen = openIndex === i;
        const label = item.title ?? item.question ?? "";
        const hasHtml = Boolean(item.content);

        if (variant === "valori") {
          return (
            <div key={i}>
              <button
                type="button"
                className={`w-full flex items-center justify-between gap-4 px-6 py-6 text-left transition-colors ${
                  isOpen ? "bg-secondary-50" : "bg-primary-950"
                }`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className={`text-2xl md:text-[28px] font-semibold uppercase leading-tight ${
                  isOpen ? "text-primary" : "text-accent"
                }`}>
                  {label}
                </span>
                <span
                  className={`material-symbols-outlined flex-shrink-0 text-[28px] leading-none select-none ${
                    isOpen ? "text-primary" : "text-accent"
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
                    className="overflow-hidden bg-secondary-50"
                  >
                    <p className="px-6 pb-6 text-[15px] md:text-base text-primary-950 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }

        return (
          <div
            key={i}
            className="bg-[#f9f9f9] border border-[#bdbdbd]/80 shadow-[0px_1px_1.5px_rgba(0,0,0,0.15)]"
          >
            <button
              type="button"
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-[16px] md:text-[17px] font-medium text-primary-950 leading-snug">
                {label}
              </span>
              <span
                className={`material-symbols-outlined flex-shrink-0 text-[24px] leading-none select-none transition-colors ${
                  isOpen ? "text-accent-dark" : "text-primary"
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
                      className="px-6 pb-6 text-[15px] md:text-base text-primary-950 leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.content! }}
                    />
                  ) : (
                    <p className="px-6 pb-6 text-[15px] md:text-base text-primary-950 leading-relaxed">
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
