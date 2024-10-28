# Crossmint Megaverse Challenge

A TypeScript solution for the Crossmint Megaverse Challenge that creates a 2D space with various astral objects (POLYanets, SOLoons, and comETHs) by interacting with the Crossmint API.

## Overview

This project automates the creation of a megaverse map through the Crossmint API. It handles two phases:

- **Phase 1**: Creates a basic map with only POLYanets
- **Phase 2**: Creates a complex map including POLYanets, SOLoons (with colors), and comETHs (with directions)

## Technical Highlights

- **Clean Architecture**
  - Domain-driven design with clear entity separation
  - Dependency injection for better testability and maintainability
  - Interface-based design for loose coupling

- **Robust Error Handling**
  - Custom error types for different scenarios
  - Graceful failure handling
  - Detailed error messages for debugging

- **Performance Optimization**
  - Rate limiting to prevent API throttling
  - Concurrent request handling
  - Configurable bottleneck settings

- **Type Safety**
  - Comprehensive TypeScript types
  - Strict null checks
  - Template literal types for entity variations

## Features

- Fully automated map creation
- Rate limiting to handle API constraints
- Type-safe implementation using TypeScript
- Modular architecture with separate services for each entity type
- Error handling and logging
- Environment-based configuration

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- A Crossmint candidate ID

## Installation

1. Clone the repository:

```bash
git clone https://github.com/SebSiclari/CrossMint-Megaverse-Challenge
```

2. Install dependencies:

```bash
yarn 
```

3.Copy the example environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your values:
```env
CROSSMINT_CANDIDATE_ID=your_actual_candidate_id
CROSSMINT_API_URL=https://challenge.crossmint.io/api

5. Run the script:

```bash
# For Phase One
PHASE=ONE yarn dev

# For Phase Two
PHASE=TWO yarn dev
```

## Project Structure

```
src/
├── api/              # API clients for each entity
├── config/           # Configuration management
├── domain/           # Domain entities and interfaces
├── errors/           # Custom error types
├── http/             # HTTP client configuration
├── interfaces/       # TypeScript interfaces
└── services/         # Business logic services
```

## Architecture Decisions

- **Dependency Injection**: Used for better testability and maintainability of the codebase
- **Rate Limiting**: Implemented using Bottleneck to handle API constraints gracefully
- **Error Handling**: Custom error types for better error tracking and debugging
- **Configuration Management**: Environment-based configuration with type safety

## Error Handling

The application handles various error scenarios:
- API rate limiting
- Network failures
- Invalid coordinates
- Configuration errors

## Development

```bash
# Run in development mode
yarn dev
```

## License

MIT
