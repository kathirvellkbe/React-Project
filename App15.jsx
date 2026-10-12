

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import "./App15.css";

// ================= REDUX TOOLKIT =================
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    toggleWishlist: (state, action) => {
      const exists = state.some((item) => item.id === action.payload.id);

      if (exists) {
        return state.filter((item) => item.id !== action.payload.id);
      }

      state.push(action.payload);
    },
  },
});

const store = configureStore({
  reducer: {
    wishlist: wishlistSlice.reducer,
  },
});

const { toggleWishlist } = wishlistSlice.actions;

// ================= CONTEXT AND REDUCER =================
const BookingContext = createContext(null);

function bookingReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((booking) => booking.id !== action.payload);
    default:
      return state;
  }
}

function BookingProvider({ children }) {
  const [bookings, dispatch] = useReducer(bookingReducer, []);

  return (
    <BookingContext.Provider value={{ bookings, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

// ================= DESTINATION DATA =================
const destinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    price: 24999,
    days: 5,
    category: "Beach",
    emoji: "🏝️",
    description: "Enjoy tropical beaches, peaceful temples and beautiful sunsets.",
  },
  {
    id: 2,
    name: "Paris",
    country: "France",
    price: 45999,
    days: 4,
    category: "City",
    emoji: "🗼",
    description: "Discover iconic landmarks, cafes and romantic city streets.",
  },
  {
    id: 3,
    name: "Swiss Alps",
    country: "Switzerland",
    price: 69999,
    days: 6,
    category: "Mountain",
    emoji: "🏔️",
    description: "Experience mountain scenery, alpine villages and fresh air.",
  },
  {
    id: 4,
    name: "Tokyo",
    country: "Japan",
    price: 38999,
    days: 5,
    category: "City",
    emoji: "⛩️",
    description: "Explore Japanese culture, food and exciting city attractions.",
  },
  {
    id: 5,
    name: "Maldives",
    country: "Maldives",
    price: 54999,
    days: 4,
    category: "Beach",
    emoji: "🌊",
    description: "Relax by crystal-clear water and enjoy an island escape.",
  },
  {
    id: 6,
    name: "Manali",
    country: "India",
    price: 15999,
    days: 3,
    category: "Mountain",
    emoji: "🏞️",
    description: "Explore scenic valleys, mountain views and peaceful nature.",
  },
];

// ================= HEADER =================
function Header() {
  const wishlist = useSelector((state) => state.wishlist);

  return (
    <header className="header">
      <Link to="/" className="brand">
        ✈ Wanderly
      </Link>

      <nav className="navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/destinations">Destinations</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/book">Book Trip</NavLink>
      </nav>

      <Link to="/wishlist" className="wishlist-nav">
        ♡ Wishlist ({wishlist.length})
      </Link>
    </header>
  );
}

// ================= DESTINATION CARD / PROPS =================
function DestinationCard({ destination }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  const saved = wishlist.some((item) => item.id === destination.id);

  return (
    <article className="destination-card">
      <div className="destination-art">
        <span className="destination-emoji">{destination.emoji}</span>

        <span className="category-badge">{destination.category}</span>

        <button
          className={`heart-button ${saved ? "heart-saved" : ""}`}
          onClick={() => dispatch(toggleWishlist(destination))}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="destination-info">
        <p className="country-label">{destination.country}</p>
        <h3>{destination.name}</h3>
        <p className="destination-description">{destination.description}</p>

        <div className="destination-bottom">
          <div>
            <span className="starting-label">Starting from</span>
            <p className="destination-price">
              ₹{destination.price.toLocaleString("en-IN")}
            </p>
            <span className="duration">{destination.days} days</span>
          </div>

          <Link to={`/destinations/${destination.id}`} className="details-link">
            Explore →
          </Link>
        </div>
      </div>
    </article>
  );
}

// ================= HOME PAGE =================
function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>

          <h1>
            Discover the
            <br />
            world <span>your way.</span>
          </h1>

          <p>
            Find incredible destinations, plan memorable holidays, and turn
            your travel dreams into unforgettable experiences.
          </p>

          <div className="hero-buttons">
            <Link to="/destinations" className="primary-button">
              Explore Destinations →
            </Link>

            <Link to="/about" className="outline-button">
              About Wanderly
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>50+</strong>
              <span>Destinations</span>
            </div>
            <div>
              <strong>2,000+</strong>
              <span>Happy Travellers</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>Travel Rating</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-sun" />
          <div className="hero-mountain mountain-a" />
          <div className="hero-mountain mountain-b" />
          <div className="hero-water" />
          <div className="floating-note note-top">🌴 Tropical escapes</div>
          <div className="floating-note note-bottom">✦ Make memories</div>
          <div className="hero-plane">✈</div>
        </div>
      </section>

      <section className="benefits">
        <div className="benefit">
          <span>🌍</span>
          <div>
            <h3>Amazing Destinations</h3>
            <p>Discover places worth remembering.</p>
          </div>
        </div>

        <div className="benefit">
          <span>💳</span>
          <div>
            <h3>Easy Planning</h3>
            <p>Find trips to match your budget.</p>
          </div>
        </div>

        <div className="benefit">
          <span>🧭</span>
          <div>
            <h3>Your Own Adventure</h3>
            <p>Choose the journey that suits you.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">HANDPICKED FOR YOU</span>
            <h2>Popular destinations</h2>
            <p>Get inspired by our favourite places to explore.</p>
          </div>

          <Link to="/destinations" className="text-link">
            View all destinations →
          </Link>
        </div>

        <div className="destination-grid">
          {destinations.slice(0, 3).map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      </section>

      <section className="call-to-action">
        <div>
          <span className="eyebrow">READY FOR YOUR NEXT ADVENTURE?</span>
          <h2>Your next great story is waiting.</h2>
          <p>Choose a destination and begin planning your journey today.</p>
        </div>

        <Link to="/destinations" className="primary-button">
          Start Exploring →
        </Link>
      </section>
    </>
  );
}

// ================= DESTINATIONS / SEARCH PARAMS / useRef =================
function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef(null);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";

  const filtered = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(search.toLowerCase()) ||
      destination.country.toLowerCase().includes(search.toLowerCase());

    return matchesSearch &&
      (category === "All" || destination.category === category);
  });

  function changeSearch(value) {
    const params = new URLSearchParams(searchParams);

    if (value) params.set("search", value);
    else params.delete("search");

    setSearchParams(params);
  }

  function changeCategory(value) {
    const params = new URLSearchParams(searchParams);

    if (value === "All") params.delete("category");
    else params.set("category", value);

    setSearchParams(params);
  }

  return (
    <main className="page">
      <section className="page-banner">
        <span className="eyebrow">EXPLORE THE WORLD</span>
        <h1>Find your happy place.</h1>
        <p>Search inspiring destinations and choose your next adventure.</p>
      </section>

      <section className="section">
        <div className="search-toolbar">
          <input
            ref={searchRef}
            value={search}
            onChange={(event) => changeSearch(event.target.value)}
            placeholder="Search destinations or countries..."
            aria-label="Search destinations"
          />

          <select
            value={category}
            onChange={(event) => changeCategory(event.target.value)}
            aria-label="Filter destinations by category"
          >
            <option value="All">All categories</option>
            <option value="Beach">Beach</option>
            <option value="City">City</option>
            <option value="Mountain">Mountain</option>
          </select>

          <button
            className="outline-button"
            onClick={() => searchRef.current?.focus()}
          >
            Search
          </button>
        </div>

        <p className="result-count">
          Showing {filtered.length} destination(s)
        </p>

        {filtered.length > 0 ? (
          <div className="destination-grid">
            {filtered.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>🔎</span>
            <h2>No destinations found</h2>
            <p>Try changing your search or category.</p>
            <button
              className="primary-button"
              onClick={() => setSearchParams({})}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

// ================= DETAILS / useParams =================
function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const destination = destinations.find(
    (item) => item.id === Number(id)
  );

  if (!destination) {
    return (
      <main className="page empty-state">
        <h2>Destination not found</h2>
        <Link to="/destinations" className="primary-button">
          Back to destinations
        </Link>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="detail-layout">
        <div className="detail-art">{destination.emoji}</div>

        <div className="detail-content">
          <span className="eyebrow">{destination.country}</span>
          <h1>{destination.name}</h1>
          <p>{destination.description}</p>

          <div className="detail-facts">
            <span>📅 {destination.days} days</span>
            <span>🏷️ {destination.category}</span>
          </div>

          <h2>₹{destination.price.toLocaleString("en-IN")}</h2>
          <p className="muted">Example starting price per traveller.</p>

          <button
            className="primary-button"
            onClick={() =>
              navigate("/book", { state: { destination } })
            }
          >
            Book this trip →
          </button>
        </div>
      </section>
    </main>
  );
}

// ================= WISHLIST / REDUX =================
function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <main className="page">
      <section className="page-banner">
        <span className="eyebrow">YOUR SAVED PLACES</span>
        <h1>Your travel wishlist.</h1>
        <p>Keep your favourite destinations together.</p>
      </section>

      <section className="section">
        {wishlist.length > 0 ? (
          <>
            <div className="destination-grid">
              {wishlist.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>

            <button
              className="outline-button clear-button"
              onClick={() => {
                wishlist.forEach((item) => dispatch(toggleWishlist(item)));
              }}
            >
              Clear wishlist
            </button>
          </>
        ) : (
          <div className="empty-state">
            <span>♡</span>
            <h2>Your wishlist is empty</h2>
            <p>Tap the heart on a destination to save it here.</p>
            <Link to="/destinations" className="primary-button">
              Explore destinations
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

// ================= BOOKING FORM / CONTEXT =================
function BookTrip() {
  const { bookings, dispatch } = useContext(BookingContext);
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    date: "",
    travellers: "1",
  });

  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const selected = location.state?.destination;

    if (selected) {
      setForm((previous) => ({
        ...previous,
        destination: selected.name,
      }));
      window.history.replaceState({}, document.title, "/book");
    }
  }, [location.state]);

  function updateForm(event) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
    setFeedback("");
  }

  function submitBooking(event) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.destination ||
      !form.date
    ) {
      setFeedback("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFeedback("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) {
      setFeedback("Please enter a valid phone number.");
      return;
    }

    const booking = {
      ...form,
      id: Date.now(),
      travellers: Number(form.travellers),
    };

    dispatch({ type: "ADD", payload: booking });

    setFeedback("Your booking request was submitted successfully!");

    setForm({
      name: "",
      email: "",
      phone: "",
      destination: "",
      date: "",
      travellers: "1",
    });
  }

  return (
    <main className="page">
      <section className="page-banner">
        <span className="eyebrow">LET'S PLAN YOUR TRIP</span>
        <h1>Make it a journey to remember.</h1>
        <p>Complete this form to create a sample booking request.</p>
      </section>

      <section className="booking-layout section">
        <form className="form-panel" onSubmit={submitBooking}>
          <h2>Trip details</h2>
          <p className="muted">Fields marked * are required.</p>

          <label>
            Full name *
            <input
              name="name"
              value={form.name}
              onChange={updateForm}
              placeholder="Enter your full name"
              required
            />
          </label>

          <label>
            Email address *
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={updateForm}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Phone number *
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={updateForm}
              placeholder="Enter your phone number"
              required
            />
          </label>

          <label>
            Destination *
            <select
              name="destination"
              value={form.destination}
              onChange={updateForm}
              required
            >
              <option value="">Choose a destination</option>
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.name}>
                  {destination.name}
                </option>
              ))}
            </select>
          </label>

          <div className="form-row">
            <label>
              Travel date *
              <input
                name="date"
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={form.date}
                onChange={updateForm}
                required
              />
            </label>

            <label>
              Travellers
              <select
                name="travellers"
                value={form.travellers}
                onChange={updateForm}
              >
                {[1, 2, 3, 4, 5, 6].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {feedback && (
            <p
              className={
                feedback.includes("successfully")
                  ? "success-message"
                  : "error-message"
              }
              role="status"
            >
              {feedback}
            </p>
          )}

          <button type="submit" className="primary-button full-button">
            Submit Booking Request →
          </button>
        </form>

        <aside className="booking-aside">
          <span className="aside-icon">✈️</span>
          <h2>Your adventure begins here.</h2>
          <p>
            Select your destination, pick a travel date, and start planning
            your next memorable journey.
          </p>
          <div className="booking-count">
            <strong>{bookings.length}</strong>
            <span>Booking request(s) in this session</span>
          </div>
          <h3>Recent requests</h3>

          {bookings.length === 0 ? (
            <p className="muted">Your submitted requests will appear here.</p>
          ) : (
            bookings.map((booking) => (
              <div className="booking-item" key={booking.id}>
                <div>
                  <strong>{booking.destination}</strong>
                  <p>{booking.name} · {booking.date}</p>
                </div>
                <button
                  className="delete-button"
                  onClick={() => dispatch({ type: "DELETE", payload: booking.id })}
                  aria-label="Delete booking"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </aside>
      </section>
    </main>
  );
}

// ================= ABOUT =================
function About() {
  return (
    <main className="page">
      <section className="page-banner">
        <span className="eyebrow">OUR STORY</span>
        <h1>Travel makes the world feel closer.</h1>
        <p>Every journey creates an opportunity for a new story.</p>
      </section>

      <section className="about-layout section">
        <div className="about-illustration">🌍</div>
        <div>
          <h2>Welcome to Wanderly</h2>
          <p>
            Wanderly is a travel booking frontend demonstration designed to
            make discovering destinations simple and enjoyable. Browse trips,
            save favourite places, explore destination details, and submit
            sample booking requests.
          </p>
          <p>
            This application brings together React components, props, state,
            hooks, routing, nested routes, Redux Toolkit, Context, reducer
            patterns, search filters, and form validation.
          </p>
          <Link to="/destinations" className="primary-button">
            Find your destination →
          </Link>
        </div>
      </section>
    </main>
  );
}

// ================= SERVICES / NESTED ROUTING =================
function ServiceCard({ icon, title, description }) {
  return (
    <article className="service-card">
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

function Services() {
  return (
    <main className="page">
      <section className="page-banner">
        <span className="eyebrow">HOW WE HELP</span>
        <h1>Travel planning made simple.</h1>
        <p>Explore the services available in our demonstration application.</p>
      </section>

      <section className="section">
        <div className="service-tabs">
          <NavLink to="/services" end>All Services</NavLink>
          <NavLink to="/services/planning">Trip Planning</NavLink>
          <NavLink to="/services/stays">Stay Options</NavLink>
          <NavLink to="/services/support">Travel Support</NavLink>
        </div>

        <div className="service-grid">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

function ServiceOverview() {
  return (
    <>
      <ServiceCard
        icon="🗺️"
        title="Trip Planning"
        description="Organise an itinerary around the places you want to explore."
      />
      <ServiceCard
        icon="🏨"
        title="Stay Options"
        description="Think about accommodation, location and budget when planning."
      />
      <ServiceCard
        icon="🤝"
        title="Travel Support"
        description="Keep your trip information and booking requests organised."
      />
    </>
  );
}

function PlanningService() {
  return (
    <ServiceCard
      icon="🗺️"
      title="Trip Planning"
      description="Browse destinations, choose dates and organise your next adventure."
    />
  );
}

function StaysService() {
  return (
    <ServiceCard
      icon="🏨"
      title="Stay Options"
      description="Explore accommodation ideas that fit your travel style and budget."
    />
  );
}

function SupportService() {
  return (
    <ServiceCard
      icon="🤝"
      title="Travel Support"
      description="Submit and review sample booking requests using the booking form."
    />
  );
}

// ================= CONTACT / API INTEGRATION =================
function Contact() {
  const [users, setUsers] = useState([]);
  const [apiState, setApiState] = useState("loading");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("API request failed");
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setApiState("success");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setApiState("error");
      });

    return () => controller.abort();
  }, []);

  function updateContact(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setFeedback("");
  }

  function submitContact(event) {
    event.preventDefault();

    setFeedback("Your sample message has been submitted successfully!");
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <main className="page">
      <section className="page-banner">
        <span className="eyebrow">WE'RE HERE TO HELP</span>
        <h1>Let's talk travel.</h1>
        <p>Send us a sample message or explore the API demonstration.</p>
      </section>

      <section className="contact-layout section">
        <form className="form-panel" onSubmit={submitContact}>
          <h2>Contact us</h2>

          <label>
            Name *
            <input
              name="name"
              value={form.name}
              onChange={updateContact}
              required
              placeholder="Your name"
            />
          </label>

          <label>
            Email *
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={updateContact}
              required
              placeholder="you@example.com"
            />
          </label>

          <label>
            Subject *
            <input
              name="subject"
              value={form.subject}
              onChange={updateContact}
              required
              placeholder="How can we help?"
            />
          </label>

          <label>
            Message *
            <textarea
              name="message"
              value={form.message}
              onChange={updateContact}
              required
              rows="4"
              placeholder="Write your message..."
            />
          </label>

          {feedback && <p className="success-message">{feedback}</p>}

          <button type="submit" className="primary-button full-button">
            Send Message →
          </button>
        </form>

        <div className="api-panel">
          <span className="eyebrow">API INTEGRATION</span>
          <h2>Sample traveller contacts</h2>

          {apiState === "loading" && <p>Loading sample users...</p>}

          {apiState === "error" && (
            <p>Unable to load sample data. Check your internet connection.</p>
          )}

          {apiState === "success" && (
            <>
              <p className="muted">Loaded {users.length} sample users from an API.</p>
              {users.slice(0, 5).map((user) => (
                <div className="api-user" key={user.id}>
                  <span className="api-avatar">{user.name.charAt(0)}</span>
                  <div>
                    <strong>{user.name}</strong>
                    <p>{user.email}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

// ================= FOOTER =================
function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="brand">✈ Wanderly</Link>
      <p>Discover more. Travel further. Make memories.</p>
      <span>© 2026 Wanderly · React Training Project</span>
    </footer>
  );
}

// ================= ROUTES =================
function AppLayout() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/book" element={<BookTrip />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/services" element={<Services />}>
          <Route index element={<ServiceOverview />} />
          <Route path="planning" element={<PlanningService />} />
          <Route path="stays" element={<StaysService />} />
          <Route path="support" element={<SupportService />} />
        </Route>

        <Route
          path="*"
          element={
            <main className="page empty-state">
              <span>🧭</span>
              <h1>Page not found</h1>
              <p>The page you are looking for does not exist.</p>
              <Link to="/" className="primary-button">Back to Home</Link>
            </main>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

// ================= MAIN COMPONENT =================
export default function App15() {
  return (
    <Provider store={store}>
      <BookingProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </BookingProvider>
    </Provider>
  );
}
