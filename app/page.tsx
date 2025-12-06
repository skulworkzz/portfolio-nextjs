'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [animatedText, setAnimatedText] = useState('')
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Typing animation
  useEffect(() => {
    const phrases = [" a Full time GAMER", " a Part time STUDENT"]
    let phraseIndex = 0
    let charIndex = 0
    let currentPhrase = phrases[phraseIndex]
    let timeoutId: NodeJS.Timeout | null = null

    const typeNextChar = () => {
      if (charIndex < currentPhrase.length) {
        setAnimatedText(currentPhrase.substring(0, charIndex + 1))
        charIndex++
        timeoutId = setTimeout(typeNextChar, 100)
      } else {
        timeoutId = setTimeout(() => {
          phraseIndex = (phraseIndex + 1) % phrases.length
          currentPhrase = phrases[phraseIndex]
          charIndex = 0
          setAnimatedText('')
          timeoutId = setTimeout(typeNextChar, 100)
        }, 1500)
      }
    }

    typeNextChar()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')

            // Trigger skill bar animations
            if (entry.target.classList.contains('skill-category')) {
              const fills = entry.target.querySelectorAll('.fill')
              fills.forEach((fill) => {
                ;(fill as HTMLElement).style.animation = 'fillAnimation 1.5s ease-out forwards'
              })
            }
          }
        })
      },
      { threshold: 0.4 }
    )

    const elements = document.querySelectorAll(
      '.fade-in, .slide-in-left, .slide-in-right, .skill-category, .interest-card, .skills .grid .card'
    )
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  // Navbar scroll effect and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Navbar scroll effect
      setIsScrolled(window.scrollY > 50)

      // Active section tracking
      const sections = document.querySelectorAll('section[id]')
      let current = ''

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 120
        const sectionHeight = (section as HTMLElement).offsetHeight

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id') || ''
        }
      })

      // Check if at bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        current = 'contact'
      }

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll with animation reset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetEl = document.getElementById(targetId)

    if (targetEl) {
      targetEl.classList.remove('visible')
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })

      setTimeout(() => {
        targetEl.classList.add('visible')
      }, 800)
    }
  }

  return (
    <>
      {/* GLASSMORPHISM NAVIGATION */}
      <header className={`topbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="wrap">
          <div className="logo">Portfolio</div>
          <nav className="main-nav">
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About
            </a>
            <a 
              href="#skills" 
              className={activeSection === 'skills' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'skills')}
            >
              Skills
            </a>
            <a 
              href="#contact" 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* ENHANCED HERO */}
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-left">
            <p className="hello">Hello, I'm</p>
            <h1 className="hero-name">
              ALZYN <span className="name-small">BURAC</span>
            </h1>
            <p className="role">
              I'm <span className="animated-text">{animatedText}</span>
            </p>
            <p className="hero-desc">
              I'm passionate about tech, gaming, and learning new things. When I'm not grinding ranks, 
              I'm probably coding, designing, or building something cool.
            </p>
            <div className="hero-buttons">
              <a href="#about" className="btn btn-email">About Me</a>
              <a href="#contact" className="btn btn-fb">Contact Me</a>
            </div>
          </div>

          <div className="hero-right">
            <div className="avatar-wrap">
              <Image 
                src="/images/Profile.png" 
                alt="Alzyn profile" 
                className="avatar default-img"
                width={320}
                height={320}
                priority
              />
              <Image 
                src="/images/Profile_hover.png" 
                alt="Alzyn hover" 
                className="avatar hover-img"
                width={320}
                height={320}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about fade-in">
        <div className="wrap about-inner">
          <h2>About Me</h2>
          <p>
            I'm currently a Computer Science student pursuing this path to reach greater heights. 
            I love designing, building, and creating things that have an impact. I'm a passionate 
            technology enthusiast, constantly searching for new ways to use tech to express my 
            creativity – from design exploration, video editing, to web app coding.
          </p>
          <p>
            When I'm not working, I'm probably gaming, listening to music, or learning something new for fun.
          </p>

          <div className="about-cards">
            <div className="about-card slide-in-left">
              <div className="icon"><i className="fa-solid fa-code"></i></div>
              <h3>Clean Code</h3>
              <p>Writing maintainable, efficient, and scalable code following best practices.</p>
            </div>

            <div className="about-card fade-in">
              <div className="icon"><i className="fa-solid fa-lightbulb"></i></div>
              <h3>Problem Solver</h3>
              <p>Tackling complex challenges with creative and analytical thinking.</p>
            </div>

            <div className="about-card slide-in-right">
              <div className="icon"><i className="fa-solid fa-rocket"></i></div>
              <h3>Fast Learner</h3>
              <p>Quickly adapting to new technologies and frameworks to stay ahead.</p>
            </div>
          </div>

          <div className="contact-row">
            <div><i className="fa-solid fa-location-dot"></i> San Jose, Camarines Sur</div>
            <div><i className="fa-solid fa-envelope"></i> alzynburac01@gmail.com</div>
          </div>
        </div>
      </section>

      {/* ENHANCED WHAT I'M INTO */}
      <section id="interests" className="interests fade-in">
        <div className="wrap interests-inner">
          <h2>What I'm Into</h2>
          <p className="intro-text">
            A few of the things I'm most passionate about – where creativity, design, and technology meet.
          </p>

          <div className="interests-grid">
            <div 
              className="interest-card" 
              style={{
                '--bg': 'url("https://assets.seamedu.com/uploads/posts/feature_What-is-the-Difference-Between-a-Game-Designer-and-Game-Developer--375-by1801678429558.jpg")'
              } as React.CSSProperties}
            >
              <div className="overlay"></div>
              <h3>Game Development</h3>
            </div>
            
            <div 
              className="interest-card" 
              style={{
                '--bg': 'url("https://plus.unsplash.com/premium_photo-1678565999332-1cde462f7b24?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwZGV2fGVufDB8fDB8fHww&fm=jpg&q=60&w=3000")'
              } as React.CSSProperties}
            >
              <div className="overlay"></div>
              <h3>Web Development</h3>
            </div>
            
            <div 
              className="interest-card" 
              style={{
                '--bg': 'url("https://dp0rksi384o97.cloudfront.net/media/48/thumbnail.jpg")'
              } as React.CSSProperties}
            >
              <div className="overlay"></div>
              <h3>Video Editing</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED SKILLS */}
      <section id="skills" className="skills fade-in">
        <div className="wrap">
          <h2>Skills &amp; Expertise</h2>
          <p className="small">Technologies and tools I work with to bring ideas to life.</p>

          <div className="grid">
            <div className="card">
              <h3>Frontend Development</h3>
              <p>HTML<br />CSS<br />Basic JavaScript</p>
            </div>

            <div className="card">
              <h3>Backend Development</h3>
              <p>Python<br />MySQL</p>
            </div>

            <div className="card">
              <h3>Design &amp; Tools</h3>
              <p>Figma<br />Canva<br />ChatGPT</p>
            </div>
          </div>

          <div className="skill-bars">
            <div className="skill-category">
              <h3>Programming Languages</h3>
              <div className="skill">
                <span>HTML/CSS</span>
                <div className="bar">
                  <div 
                    className="fill" 
                    style={{
                      '--percent': '75%'
                    } as React.CSSProperties}
                  ></div>
                </div>
              </div>

              <div className="skill">
                <span>Bisaya</span>
                <div className="bar">
                  <div 
                    className="fill" 
                    style={{
                      '--percent': '60%'
                    } as React.CSSProperties}
                  ></div>
                </div>
              </div>

              <div className="skill">
                <span>BrainRot</span>
                <div className="bar">
                  <div 
                    className="fill" 
                    style={{
                      '--percent': '35%'
                    } as React.CSSProperties}
                  ></div>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <h3>Tools &amp; Frameworks</h3>
              <div className="skill">
                <span>ChatGPT - Prompt Eng.</span>
                <div className="bar">
                  <div 
                    className="fill" 
                    style={{
                      '--percent': '100%'
                    } as React.CSSProperties}
                  ></div>
                </div>
              </div>

              <div className="skill">
                <span>Babae</span>
                <div className="bar">
                  <div 
                    className="fill" 
                    style={{
                      '--percent': '5%'
                    } as React.CSSProperties}
                  ></div>
                </div>
              </div>

              <div className="skill">
                <span>Figma</span>
                <div className="bar">
                  <div 
                    className="fill" 
                    style={{
                      '--percent': '90%'
                    } as React.CSSProperties}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK WITH ME */}
      <section id="contact" className="work fade-in">
        <div className="wrap work-inner">
          <h2>"Work With Me"</h2>
          <p className="work-text">
            When I'm not coding, you can find me exploring new technologies.<br />
            Have an idea or project in mind? Let's build something great—I'm just a message away.
          </p>
          <div className="work-buttons">
            <a href="mailto:alzynburac01@gmail.com" className="btn btn-email">
              <i className="fa-solid fa-envelope"></i> Send Email
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-fb">
              <i className="fa-brands fa-facebook-f"></i> Facebook
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <p>© 2025 Callmeals. Galing mo halimaw.</p>
        </div>
      </footer>
    </>
  )
}