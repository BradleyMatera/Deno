import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// Test for API route
Deno.test("Add user route works", async () => {
  const response = await fetch("http://localhost:8000/add-user");
  const text = await response.text();
  assertEquals(text, "User added successfully!");
});

Deno.test("Fetch users route works", async () => {
  const response = await fetch("http://localhost:8000/users");
  const users = await response.json();
  assertEquals(Array.isArray(users), true);
});