import { Model } from "@decorators/Model"

@Model("user")
export class User {
  private name: string
  private email: string
  private password: string
  
  getName(): string {
    return this.name
  }
  
  setName(name: string): void {
    this.name = name
  }
  
  getEmail(): string {
    return this.email
  }
  
  setEmail(email: string): void {
    this.email = email
  }
  
  getPassword(): string {
    return this.password
  }
  
  setName(password: string): void {
    this.password = password
  }
}