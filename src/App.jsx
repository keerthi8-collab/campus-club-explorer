import { useState } from "react";
import "./App.css";

const clubs = [
  {
    id: 1,
    name: "Code Crafters",
    category: "Coding",
    description:
      "A community for students interested in programming, web development, AI, and software projects.",
    members: 120,
    meeting: "Every Tuesday, 4:00 PM",
    location: "N-Block=513",
    emoji: "💻",
  },
  {
    id: 2,
    name: "Campus Football Club",
    category: "Sports",
    description:
      "Join fellow students for football training, friendly matches, and college tournaments.",
    members: 85,
    meeting: "Every Wednesday, 4:30 PM",
    location: "College Ground",
    emoji: "⚽",
  },
  {
    id: 3,
    name: "Creative Arts Society",
    category: "Arts",
    description:
      "Explore painting, sketching, photography, design, and other creative activities.",
    members: 65,
    meeting: "Every Friday, 3:30 PM",
    location: "A block=vbt-04",
    emoji: "🎨",
  },
  {
    id: 4,
    name: "Startup Hub",
    category: "Entrepreneurship",
    description:
      "A club for aspiring entrepreneurs to develop ideas, build startups, and learn from founders.",
    members: 30,
    meeting: "Every Thursday, 5:30 PM",
    location: "N Block-214A",
    emoji: "🚀",
  },
  {
    id: 5,
    name: "Basketball Squad",
    category: "Sports",
    description:
      "Practice basketball, improve your skills, and participate in inter-college competitions.",
    members: 55,
    meeting: "Every Monday, 5:00 PM",
    location: "Indoor Stadium",
    emoji: "🏀",
  },
  {
    id: 6,
    name: "AI & Machine Learning Club",
    category: "Coding",
    description:
      "Learn artificial intelligence and machine learning through workshops, projects, and hackathons.",
    members: 95,
    meeting: "Every Saturday, 10:00 AM",
    location: " N Block-604",
    emoji: "🤖",
  },
  {
    id: 7,
    name: "Music & Performing Arts",
    category: "Arts",
    description:
      "A creative space for singers, musicians, dancers, and performers to showcase their talent.",
    members: 80,
    meeting: "Every Wednesday, 3:00 PM",
    location: "MHP",
    emoji: "🎵",
  },
  {
    id: 8,
    name: "Business Leaders Club",
    category: "Entrepreneurship",
    description:
      "Discuss business ideas, leadership, marketing, finance, and entrepreneurship.",
    members: 60,
    meeting: "Every Friday, 5:00 PM",
    location: "A block-Sangamam Seminar Hall",
    emoji: "📈",
  },
];

// Reusable category button
function CategoryButton({ category, selected, onClick }) {
  return (
    <button
      className={`category-btn ${selected ? "active" : ""}`}
      onClick={() => onClick(category)}
    >
      {category}
    </button>
  );
}

// Reusable club card
function ClubCard({ club, onViewDetails }) {
  return (
    <div className="club-card">
      <div className="club-icon">{club.emoji}</div>

      <div className="club-content">
        <span className="club-category">{club.category}</span>

        <h2>{club.name}</h2>

        <p>{club.description}</p>

        <div className="club-info">
          <span>👥 {club.members} members</span>
          <span>📅 {club.meeting}</span>
        </div>

        <button
          className="details-btn"
          onClick={() => onViewDetails(club)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

// Modal for displaying club details
function ClubDetails({ club, onClose }) {
  if (!club) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="modal-icon">{club.emoji}</div>

        <span className="club-category">{club.category}</span>

        <h2>{club.name}</h2>

        <p>{club.description}</p>

        <div className="detail-item">
          <strong>Members</strong>
          <span>{club.members} students</span>
        </div>

        <div className="detail-item">
          <strong>Meeting Time</strong>
          <span>{club.meeting}</span>
        </div>

        <div className="detail-item">
          <strong>Location</strong>
          <span>{club.location}</span>
        </div>

        <button className="join-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedClub, setSelectedClub] = useState(null);

  const categories = [
    "All",
    "Coding",
    "Sports",
    "Arts",
    "Entrepreneurship",
  ];

  // Search + category filtering
  const filteredClubs = clubs.filter((club) => {
    const matchesCategory =
      selectedCategory === "All" ||
      club.category === selectedCategory;

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      club.name.toLowerCase().includes(search) ||
      club.category.toLowerCase().includes(search) ||
      club.description.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleViewDetails = (club) => {
    setSelectedClub(club);
  };

  const handleCloseDetails = () => {
    setSelectedClub(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🎓</span>
            <span>Campus Club Explorer</span>
          </div>

          <p>Discover. Connect. Get Involved.</p>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Campus Community</h1>

          <p>
            Explore clubs, meet like-minded students, and discover
            something you love.
          </p>

          {/* Search */}
          <div className="search-container">
            <span className="search-icon">🔍</span>

            <input
              type="text"
              placeholder="Search clubs..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="main-content">
        <section className="filter-section">
          <h2>Explore Clubs</h2>

          <div className="categories">
            {categories.map((category) => (
              <CategoryButton
                key={category}
                category={category}
                selected={selectedCategory === category}
                onClick={handleCategoryChange}
              />
            ))}
          </div>
        </section>

        {/* Conditional rendering */}
        {filteredClubs.length > 0 ? (
          <section className="club-grid">
            {filteredClubs.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                onViewDetails={handleViewDetails}
              />
            ))}
          </section>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔎</div>

            <h2>No clubs found</h2>

            <p>
              Try a different search term or choose another category.
            </p>

            <button
              className="reset-btn"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Campus Club Explorer</p>
        <p>Find your community. Make an impact.</p>
      </footer>

      {/* Club details modal */}
      <ClubDetails
        club={selectedClub}
        onClose={handleCloseDetails}
      />
    </div>
  );
}

export default App;
