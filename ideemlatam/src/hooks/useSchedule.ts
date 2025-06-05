// src/hooks/useSchedule.ts

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import type { Schedule } from "@/interfaces/schedule";
import {
  getSchedules,
  createSchedule,
  updateSchedule,
} from "@/api/services/schedule";

export function useSchedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetch = async () => {
    setLoading(true);
    try {
      const data = await getSchedules();
      setSchedules(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Error loading schedules");
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const filteredSchedules = schedules.filter((p) =>
    (p.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const addSchedule = async (data: Schedule) => {
    const id = toast.loading("Creating schedule...");
    try {
      await createSchedule(data);
      
      await fetch();
      toast.success("Schedule created", { id });
    } catch {
      toast.error("Failed to create schedule", { id });
    }
  };

  const editSchedule = async (data: Schedule) => {
    const id = toast.loading("Updating schedule...");
    try {
      await updateSchedule(data);
      await fetch();
      toast.success("Schedule updated", { id });
    } catch {
      toast.error("Failed to update schedule", { id });
    }
  };

  return {
    schedules,
    filteredSchedules,
    loading,
    searchTerm,
    setSearchTerm,
    addSchedule,
    editSchedule,
  };
}
