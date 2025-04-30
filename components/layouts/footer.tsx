"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Footer() {
  const [showCookieSettings, setShowCookieSettings] = useState(false)

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">© 2025 Urdemonlord</h3>
            <p className="text-sm text-muted-foreground">
              Aplikasi editor prompt yang membantu Anda membuat prompt AI yang efektif.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
                  Docs
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground">
                  Status
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-sm text-muted-foreground hover:text-foreground">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCookieSettings(!showCookieSettings)}
                className="text-sm"
              >
                Manage cookies
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm"
              >
                Do not share my personal information
              </Button>
            </div>
          </div>

          {showCookieSettings && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Cookie Settings</h4>
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your experience. You can manage your cookie preferences here.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Essential Cookies</span>
                  <Button variant="outline" size="sm" disabled>
                    Always On
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Analytics Cookies</span>
                  <Button variant="outline" size="sm">
                    Toggle
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Marketing Cookies</span>
                  <Button variant="outline" size="sm">
                    Toggle
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  )
} 