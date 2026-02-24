"use client";

import { useState } from "react";
import type { Riddle } from "@/lib/riddles";

type CheckAnswerFn = (
	riddleId: string,
	answerId: string,
) => Promise<{ correct: boolean }>;

export const RiddleView = ({
	riddle,
	checkAnswer,
}: {
	riddle: Riddle;
	checkAnswer?: CheckAnswerFn;
}) => {
	const designator = `RDL-${riddle.id.padStart(3, "0")}`;
	const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
	const [result, setResult] = useState<{ correct: boolean } | null>(null);

	const handleAnswerClick = async (answerId: string) => {
		if (selectedAnswerId || !checkAnswer) return;
		setSelectedAnswerId(answerId);
		const response = await checkAnswer(riddle.id, answerId);
		setResult(response);
	};

	const getStatus = (answerId: string): string | undefined => {
		if (!result || selectedAnswerId !== answerId) return undefined;
		return result.correct ? "correct" : "wrong";
	};

	const isDisabled = selectedAnswerId !== null;

	return (
		<main className="flex flex-1 flex-col items-center justify-center px-4 py-16 aviation-grid">
			<div className="w-full max-w-2xl">
				{/* Flight designator header */}
				<div className="flex items-center gap-3 mb-6">
					<span className="font-mono text-xs tracking-[0.2em] uppercase text-amber">
						{designator}
					</span>
					<span className="flex-1 h-px bg-panel-border" />
					<span className="font-mono text-xs tracking-wider text-muted">
						RIDDLE
					</span>
				</div>

				{/* Riddle card — instrument panel style */}
				<div className="hud-frame hud-frame-bottom rounded-sm border border-panel-border bg-panel p-8 shadow-sm">
					<p className="text-lg leading-relaxed tracking-wide font-light">
						{riddle.contents}
					</p>
				</div>

				{/* Answer options */}
				<div className="mt-10">
					<div className="flex items-center gap-3 mb-4">
						<span className="font-mono text-xs tracking-[0.2em] uppercase text-muted">
							OPTIONS
						</span>
						<span className="flex-1 h-px bg-panel-border" />
					</div>

					<ul className="space-y-2">
						{riddle.answers.map((answer, index) => {
							const status = getStatus(answer.id);
							return (
								<li key={answer.id}>
									<button
										type="button"
										data-test={`answer-${answer.id}`}
										data-status={status}
										disabled={isDisabled}
										onClick={() => handleAnswerClick(answer.id)}
										className={`group flex w-full items-center gap-4 rounded-sm border px-5 py-4 text-left transition-colors ${
											status === "correct"
												? "border-correct bg-correct-bg"
												: status === "wrong"
													? "border-wrong bg-wrong-bg"
													: "border-answer-border bg-answer-bg hover:bg-answer-hover hover:border-amber-dim"
										} ${isDisabled && !status ? "opacity-50 cursor-not-allowed" : ""} ${!isDisabled ? "cursor-pointer" : ""}`}
									>
										<span
											className={`font-mono text-xs tabular-nums w-5 shrink-0 ${
												status === "correct"
													? "text-correct"
													: status === "wrong"
														? "text-wrong"
														: "text-amber"
											}`}
										>
											{String.fromCharCode(65 + index)}
										</span>
										<span className="text-sm tracking-wide">
											{answer.text}
										</span>
									</button>
								</li>
							);
						})}
					</ul>

					{result && (
						<p
							data-test="result-message"
							className={`mt-6 font-mono text-sm tracking-wide ${
								result.correct ? "text-correct" : "text-wrong"
							}`}
						>
							{result.correct
								? "Great job! Your answer is correct"
								: "Your answer is wrong"}
						</p>
					)}
				</div>

				{/* Bottom rule */}
				<div className="mt-10 flex items-center gap-3">
					<span className="flex-1 h-px bg-panel-border" />
					<span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
						AERO LOGIC
					</span>
					<span className="flex-1 h-px bg-panel-border" />
				</div>
			</div>
		</main>
	);
};
