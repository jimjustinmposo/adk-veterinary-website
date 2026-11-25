import ExpandableGallery from "@/components/ui/expandable-gallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/70 px-6 py-5 text-center">
        <p className="text-sm font-semibold tracking-wide text-muted-foreground">ALPHA DELTA VETERINARY CLINIC</p>
      </header>
      <ExpandableGallery
        headline="Care, compassion, and a closer look at our clinic."
        buttonLabel="Explore our clinic"
      />
    </main>
  );
}