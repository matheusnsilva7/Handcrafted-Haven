"use client";

export default function About() {
  return (
    <main className="about-page">
      
      {/* HERO */}
      <section className="about-hero">
        <div className="container">
          <h1>About Handcrafted Haven</h1>
          <p>
            A marketplace where craftsmanship, creativity, and community come together.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="about-content container">
        
        <div className="about-text">
          <p>
            Handcrafted Haven is a curated marketplace where artisans and creators 
            share their unique, handmade products with the world. Our platform is 
            designed to empower makers by giving them a dedicated space to showcase 
            their craftsmanship, tell their stories, and connect directly with 
            customers who value authenticity.
          </p>

          <p>
            We believe that every handcrafted piece carries meaning — a story, a 
            process, and a human touch that cannot be replicated. By bringing these 
            creations into a digital space, we help bridge the gap between talented 
            artisans and conscious consumers.
          </p>

          <p>
            Our mission is to support independent creators, promote sustainable and 
            thoughtful consumption, and build a community where creativity thrives. 
            Whether you're discovering new products or sharing your own work, 
            Handcrafted Haven is a place where craftsmanship meets connection.
          </p>
        </div>

        {/* IMAGE */}
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
            alt="Artisan workspace"
          />
        </div>

      </section>

      {/* VALUES / CARDS */}
      <section className="about-values">
        <div className="container about-cards">

          <div className="about-card">
            <h3>Support Artisans</h3>
            <p>We empower independent creators to grow and share their work.</p>
          </div>

          <div className="about-card">
            <h3>Authenticity</h3>
            <p>Every product is unique, meaningful, and handcrafted with care.</p>
          </div>

          <div className="about-card">
            <h3>Community</h3>
            <p>We connect makers and buyers through a shared love of creativity.</p>
          </div>

        </div>
      </section>

    </main>
  );
}