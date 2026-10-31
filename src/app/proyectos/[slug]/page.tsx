import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import ProjectDetail from "./ProjectDetail";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () =>
  projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.name.es} — Iván Terol`,
    description: project.description.es,
    openGraph: { images: [project.imageUrl] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  return <ProjectDetail index={index} />;
}
