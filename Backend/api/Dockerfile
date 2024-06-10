# Build Backend
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dotnetbuild
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

ARG BUILD_CONFIGURATIONS=Release

WORKDIR /src
COPY ./api.csproj .
RUN dotnet restore api.csproj

COPY . .
WORKDIR "/src"
RUN dotnet build "api.csproj" -c $BUILD_CONFIGURATIONS -o /app/build

ARG BUILD_CONFIGURATIONS=Release
RUN dotnet publish "api.csproj" -c $BUILD_CONFIGURATIONS -o /app/build/publish --no-self-contained -p:UseAppHost=false


FROM base AS final
WORKDIR /app
COPY --from=dotnetbuild /app/build/publish .
ENTRYPOINT ["dotnet", "api.dll"]
