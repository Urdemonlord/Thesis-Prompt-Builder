"use client"

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layouts/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Save, Download, Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useLocalStorage("auto-save-enabled", true);
  const [darkMode, setDarkMode] = useLocalStorage("dark-mode-preference", "system");
  const [allData, setAllData] = useLocalStorage("thesis-prompts", {});
  
  useEffect(() => {
    // Ambil API Key dari localStorage saat komponen dimount
    const savedApiKey = localStorage.getItem("gemini_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);
  
  const handleSaveApiKey = () => {
    setIsLoading(true);
    try {
      // Simpan API Key ke localStorage
      localStorage.setItem("gemini_api_key", apiKey);
      toast.success("API Key berhasil disimpan!");
      
      // Refresh halaman untuk memperbarui status API Key
      window.location.reload();
    } catch (error) {
      toast.error("Gagal menyimpan API Key");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRemoveApiKey = () => {
    try {
      // Hapus API Key dari localStorage
      localStorage.removeItem("gemini_api_key");
      setApiKey("");
      toast.success("API Key berhasil dihapus!");
      
      // Refresh halaman untuk memperbarui status API Key
      window.location.reload();
    } catch (error) {
      toast.error("Gagal menghapus API Key");
      console.error(error);
    }
  };
  
  const handleExportData = () => {
    const dataStr = JSON.stringify(allData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `thesis-prompt-builder-backup-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success("Data exported successfully");
  };
  
  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);
        
        if (typeof importedData === 'object' && importedData !== null) {
          setAllData(importedData);
          toast.success("Data imported successfully");
        } else {
          toast.error("Invalid data format");
        }
      } catch (error) {
        toast.error("Error importing data");
        console.error(error);
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  };
  
  const handleClearAllData = () => {
    if (window.confirm("Are you sure you want to clear ALL data? This cannot be undone.")) {
      // Clear all local storage except theme preference
      const themePreference = darkMode;
      localStorage.clear();
      setDarkMode(themePreference);
      setAllData({});
      setApiKey("");
      toast.success("All data cleared successfully");
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-3xl mx-auto p-4 md:p-8">
        <Card className="border-0 shadow-none mb-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-2xl md:text-3xl">Settings</CardTitle>
            <CardDescription>
              Manage your application preferences and data
            </CardDescription>
          </CardHeader>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan API</CardTitle>
              <CardDescription>
                Konfigurasi API Key Google Gemini untuk menggunakan fitur AI Helper
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Masukkan API Key Google Gemini Anda"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSaveApiKey}
                    disabled={isLoading || !apiKey.trim()}
                  >
                    {isLoading ? "Menyimpan..." : "Simpan API Key"}
                  </Button>
                  {apiKey && (
                    <Button 
                      variant="destructive"
                      onClick={handleRemoveApiKey}
                      disabled={isLoading}
                    >
                      Hapus API Key
                    </Button>
                  )}
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Cara Mendapatkan API Key:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Buka <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">makersuite.google.com/app/apikey</a></li>
                  <li>Login dengan akun Google Anda</li>
                  <li>Klik &quot;Create API key&quot;</li>
                  <li>Salin API Key yang dihasilkan</li>
                  <li>Tempel API Key di input di atas</li>
                  <li>Klik &quot;Simpan API Key&quot;</li>
                </ol>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Application Preferences</CardTitle>
              <CardDescription>
                Customize how the application works
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Auto-save drafts</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically save your work as you type
                  </p>
                </div>
                <Switch 
                  checked={autoSaveEnabled} 
                  onCheckedChange={setAutoSaveEnabled} 
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Backup, restore, or clear your application data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="mr-2 h-4 w-4" />
                  Export All Data
                </Button>
                
                <div className="relative">
                  <input
                    type="file"
                    id="import-data"
                    accept=".json"
                    onChange={handleImportData}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Data
                  </Button>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Danger Zone</h3>
                <Button variant="destructive" onClick={handleClearAllData}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}