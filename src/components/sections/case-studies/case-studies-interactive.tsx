"use client";

import { useState, useMemo } from "react";
import { CaseStudy } from "@/domain/models/case-study.model";
import { Locale } from "@/i18n";
import { CaseStudyCard } from "@/components/ui/case-study/case-study-card";

interface CaseStudiesInteractiveProps {
  caseStudies: CaseStudy[];
  locale: Locale;
}

export function CaseStudiesInteractive({ caseStudies, locale }: CaseStudiesInteractiveProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const uniqueTags = useMemo(() => {
    const tags = caseStudies.flatMap(cs => cs.tags);
    return Array.from(new Set(tags));
  }, [caseStudies]);

  const filteredStudies = useMemo(() => {
    if (!selectedTag) return caseStudies;
    return caseStudies.filter(cs => cs.tags.includes(selectedTag));
  }, [caseStudies, selectedTag]);

  const toggleTag = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <>
      <div className="flex gap-4 mb-8">
        <button
          className={`px-4 py-2 border ${selectedTag === null ? "bg-gray-200" : ""}`}
          onClick={() => setSelectedTag(null)}
        >
          All
          {/* todo add translations */}
        </button>
        {uniqueTags.map(tag => (
          <button
            key={tag}
            className={`px-4 py-2 border ${selectedTag === tag ? "bg-gray-200" : ""}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="md:container relative mx-auto flex flex-col gap-16">
        {filteredStudies.map(cs => (
          <CaseStudyCard key={cs.id} caseStudy={cs} locale={locale} />
        ))}
      </div>
    </>
  );
}