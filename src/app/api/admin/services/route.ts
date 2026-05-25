import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "src/data/site-content.json");

function readContent() {
  return JSON.parse(fs.readFileSync(CONTENT_PATH, "utf-8"));
}

function writeContent(data: unknown) {
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function checkAuth(req: NextRequest): boolean {
  const secret = req.headers.get("x-admin-secret");
  return !!secret && secret === process.env.ADMIN_SECRET;
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || !body.id || !body.slug || !body.title) {
    return NextResponse.json({ error: "Campi obbligatori mancanti: id, slug, title" }, { status: 400 });
  }

  const content = readContent();

  const exists = content.services.find((s: { id: string }) => s.id === body.id);
  if (exists) {
    return NextResponse.json({ error: `Servizio con id "${body.id}" già esistente` }, { status: 409 });
  }

  const maxOrder = content.services.reduce(
    (max: number, s: { order: number }) => Math.max(max, s.order),
    0
  );

  const newService = {
    id: body.id,
    slug: body.slug,
    order: body.order ?? maxOrder + 1,
    title: body.title ?? "",
    subtitle: body.subtitle ?? "",
    label: body.label ?? "",
    detail1Title: body.detail1Title ?? "",
    detail1Text: body.detail1Text ?? "",
    detail2Title: body.detail2Title ?? "",
    detail2Text: body.detail2Text ?? "",
    image: body.image ?? "",
    imageAlt: body.imageAlt ?? "",
    heroImage: body.heroImage ?? "",
    heroImageAlt: body.heroImageAlt ?? "",
  };

  content.services.push(newService);
  content.services.sort((a: { order: number }, b: { order: number }) => a.order - b.order);
  writeContent(content);

  return NextResponse.json(newService, { status: 201 });
}
